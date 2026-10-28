import {
  Candidate,
  CandidateStatus,
  EnglishLevel,
  SelectionProcess,
  SeniorityLevel,
  Vacancy,
} from "../types/models.js";

const seniorityOrder: SeniorityLevel[] = [
  "Junior",
  "Semi-Senior",
  "Senior",
  "Lead",
  "Executive",
];

const englishOrder: EnglishLevel[] = [
  "A1",
  "A2",
  "B1",
  "B2",
  "C1",
  "C2",
  "Native",
];

export function calculateCandidateScore(
  candidate: Candidate,
  vacancy: Vacancy,
): number {
  const candidateSkills = new Set(
    candidate.skills.map((skill) => skill.toLocaleLowerCase()),
  );
  const requiredSkills = [
    ...new Set(vacancy.requiredSkills.map((skill) => skill.toLocaleLowerCase())),
  ];
  const preferredSkills = [
    ...new Set(vacancy.preferredSkills.map((skill) => skill.toLocaleLowerCase())),
  ];
  const matchedRequiredSkills = requiredSkills.filter((skill) =>
    candidateSkills.has(skill),
  ).length;

  let score = 0;
  if (requiredSkills.length > 0) {
    if (matchedRequiredSkills === requiredSkills.length) {
      score = 40;
    } else if (matchedRequiredSkills / requiredSkills.length >= 0.5) {
      score = 20;
    }
  }

  const matchedPreferredSkills = preferredSkills.filter((skill) =>
    candidateSkills.has(skill),
  ).length;
  score += Math.min(matchedPreferredSkills, 2) * 10;

  if (
    candidate.yearsOfExperience >= vacancy.minYearsExperience &&
    candidate.yearsOfExperience <= vacancy.maxYearsExperience
  ) {
    score += 20;
  } else {
    const distance =
      candidate.yearsOfExperience < vacancy.minYearsExperience
        ? vacancy.minYearsExperience - candidate.yearsOfExperience
        : candidate.yearsOfExperience - vacancy.maxYearsExperience;
    if (distance <= 2) {
      score += 10;
    }
  }

  const seniorityDistance = Math.abs(
    seniorityOrder.indexOf(candidate.seniority) -
      seniorityOrder.indexOf(vacancy.requiredSeniority),
  );
  if (seniorityDistance === 0) {
    score += 15;
  } else if (seniorityDistance === 1) {
    score += 7;
  }

  if (
    englishOrder.indexOf(candidate.englishLevel) >=
    englishOrder.indexOf(vacancy.requiredEnglishLevel)
  ) {
    score += 15;
  }

  if (
    candidate.expectedSalary >= vacancy.salaryRangeMin &&
    candidate.expectedSalary <= vacancy.salaryRangeMax
  ) {
    score += 10;
  } else if (
    candidate.expectedSalary > vacancy.salaryRangeMax &&
    candidate.expectedSalary <= vacancy.salaryRangeMax * 1.2
  ) {
    score += 5;
  }

  return Math.min(score, 100);
}

export function rankCandidatesForVacancy(
  candidates: Candidate[],
  vacancy: Vacancy,
): Array<{ candidate: Candidate; score: number }> {
  return candidates
    .map((candidate) => ({
      candidate,
      score: calculateCandidateScore(candidate, vacancy),
    }))
    .sort((first, second) => second.score - first.score);
}

export function groupCandidatesBySeniority(
  candidates: Candidate[],
): Record<SeniorityLevel, Candidate[]> {
  const groups: Record<SeniorityLevel, Candidate[]> = {
    Junior: [],
    "Semi-Senior": [],
    Senior: [],
    Lead: [],
    Executive: [],
  };

  for (const candidate of candidates) {
    groups[candidate.seniority].push(candidate);
  }

  return groups;
}

export function countCandidatesByStatus(
  candidates: Candidate[],
): Record<CandidateStatus, number> {
  const counts: Record<CandidateStatus, number> = {
    Active: 0,
    "In process": 0,
    Hired: 0,
    Inactive: 0,
  };

  for (const candidate of candidates) {
    counts[candidate.status] += 1;
  }

  return counts;
}

export function calculateAverageSalary(candidates: Candidate[]): number {
  if (candidates.length === 0) {
    return 0;
  }

  const totalSalary = candidates.reduce(
    (total, candidate) => total + candidate.expectedSalary,
    0,
  );
  return Number((totalSalary / candidates.length).toFixed(2));
}

export function findTopSkills(
  candidates: Candidate[],
  topN: number,
): Array<{ skill: string; count: number }> {
  if (!Number.isFinite(topN) || topN <= 0) {
    return [];
  }

  const skillCounts = new Map<string, { skill: string; count: number }>();

  for (const candidate of candidates) {
    const candidateSkills = new Set<string>();
    for (const skill of candidate.skills) {
      const normalizedSkill = skill.trim().toLocaleLowerCase();
      if (normalizedSkill) {
        candidateSkills.add(normalizedSkill);
        if (!skillCounts.has(normalizedSkill)) {
          skillCounts.set(normalizedSkill, { skill: skill.trim(), count: 0 });
        }
      }
    }

    for (const skill of candidateSkills) {
      const entry = skillCounts.get(skill);
      if (entry) {
        entry.count += 1;
      }
    }
  }

  return [...skillCounts.values()]
    .sort((first, second) => second.count - first.count)
    .slice(0, Math.floor(topN));
}

export function calculateVacancyFillRate(
  processes: SelectionProcess[],
): number {
  if (processes.length === 0) {
    return 0;
  }

  const hiredCount = processes.filter(
    (process) => process.stage === "Hired",
  ).length;
  return Number(((hiredCount / processes.length) * 100).toFixed(2));
}
