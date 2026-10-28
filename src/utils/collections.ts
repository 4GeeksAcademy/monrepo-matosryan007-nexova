import {
  AvailabilityStatus,
  Candidate,
  SeniorityLevel,
} from "../types/models.js";

export function filterCandidatesBySkills(
  candidates: Candidate[],
  requiredSkills: string[],
): Candidate[] {
  const candidateSkills = (candidate: Candidate) =>
    new Set(candidate.skills.map((skill) => skill.toLocaleLowerCase()));
  const normalizedRequiredSkills = requiredSkills.map((skill) =>
    skill.toLocaleLowerCase(),
  );

  return candidates.filter((candidate) => {
    const skills = candidateSkills(candidate);
    return normalizedRequiredSkills.every((skill) => skills.has(skill));
  });
}

export function filterCandidatesBySeniority(
  candidates: Candidate[],
  seniority: SeniorityLevel,
): Candidate[] {
  return candidates.filter((candidate) => candidate.seniority === seniority);
}

export function filterCandidatesByAvailability(
  candidates: Candidate[],
  availability: AvailabilityStatus[],
): Candidate[] {
  const availableStatuses = new Set(availability);
  return candidates.filter((candidate) =>
    availableStatuses.has(candidate.availability),
  );
}

export function sortCandidatesBySalary(
  candidates: Candidate[],
  order: "asc" | "desc",
): Candidate[] {
  const direction = order === "asc" ? 1 : -1;
  return [...candidates].sort(
    (first, second) =>
      direction * (first.expectedSalary - second.expectedSalary),
  );
}

export function sortCandidatesByExperience(
  candidates: Candidate[],
  order: "asc" | "desc",
): Candidate[] {
  const direction = order === "asc" ? 1 : -1;
  return [...candidates].sort(
    (first, second) =>
      direction * (first.yearsOfExperience - second.yearsOfExperience),
  );
}
