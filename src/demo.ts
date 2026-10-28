import {
  filterCandidatesByAvailability,
  filterCandidatesBySeniority,
  filterCandidatesBySkills,
  sortCandidatesByExperience,
  sortCandidatesBySalary,
} from "./utils/collections.js";
import {
  findCandidateByEmail,
  findCandidateById,
} from "./utils/search.js";
import {
  calculateAverageSalary,
  calculateVacancyFillRate,
  countCandidatesByStatus,
  findTopSkills,
  rankCandidatesForVacancy,
} from "./utils/transformations.js";
import {
  AvailabilityStatus,
  Candidate,
  SelectionProcess,
  SeniorityLevel,
  Vacancy,
} from "./types/models.js";

const candidates: Candidate[] = [
  {
    id: "C-2024-0451",
    fullName: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+1-555-0101",
    yearsOfExperience: 5,
    skills: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    englishLevel: "B2",
    seniority: "Semi-Senior",
    currentSalary: 3500,
    expectedSalary: 4200,
    availability: "1 month",
    location: "Valencia, Spain",
    remoteOnly: false,
    status: "Active",
  },
  {
    id: "C-2024-0452",
    fullName: "Jordan Lee",
    email: "jordan.lee@example.com",
    phone: "+1-555-0102",
    yearsOfExperience: 3,
    skills: ["JavaScript", "React", "CSS", "HTML"],
    englishLevel: "B1",
    seniority: "Junior",
    currentSalary: 2200,
    expectedSalary: 2800,
    availability: "Immediate",
    location: "Miami, Florida",
    remoteOnly: true,
    status: "Active",
  },
  {
    id: "C-2024-0453",
    fullName: "Taylor Silva",
    email: "taylor.silva@example.com",
    phone: "+1-555-0103",
    yearsOfExperience: 8,
    skills: ["TypeScript", "Node.js", "PostgreSQL", "Docker", "AWS"],
    englishLevel: "C1",
    seniority: "Senior",
    currentSalary: 5500,
    expectedSalary: 6500,
    availability: "2 weeks",
    location: "Valencia, Spain",
    remoteOnly: false,
    status: "In process",
  },
  {
    id: "C-2024-0454",
    fullName: "Casey Patel",
    email: "casey.patel@example.com",
    phone: "+1-555-0104",
    yearsOfExperience: 12,
    skills: ["Leadership", "Strategy", "Hiring", "Communication"],
    englishLevel: "Native",
    seniority: "Executive",
    currentSalary: 9000,
    expectedSalary: 10500,
    availability: "Not available",
    location: "Madrid, Spain",
    remoteOnly: true,
    status: "Hired",
  },
  {
    id: "C-2024-0455",
    fullName: "Riley Chen",
    email: "riley.chen@example.com",
    phone: "+1-555-0105",
    yearsOfExperience: 6,
    skills: ["TypeScript", "React", "Node.js", "Docker"],
    englishLevel: "C1",
    seniority: "Senior",
    currentSalary: 6000,
    expectedSalary: 7200,
    availability: "Immediate",
    location: "Remote",
    remoteOnly: true,
    status: "Inactive",
  },
];

const sampleVacancy: Vacancy = {
  id: "V-2024-0892",
  title: "Senior Full-Stack Developer",
  companyName: "TechCorp Solutions",
  requiredSkills: ["TypeScript", "React", "Node.js"],
  preferredSkills: ["PostgreSQL", "Docker"],
  minYearsExperience: 4,
  maxYearsExperience: 8,
  requiredEnglishLevel: "B2",
  requiredSeniority: "Senior",
  salaryRangeMin: 5000,
  salaryRangeMax: 7000,
  isRemote: true,
  location: "Remote",
  status: "Open",
};

const sampleProcesses: SelectionProcess[] = [
  {
    id: "SP-2024-1523",
    candidateId: "C-2024-0451",
    vacancyId: sampleVacancy.id,
    stage: "Interview",
    score: 72,
    notes: "Initial interview scheduled.",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-05"),
  },
  {
    id: "SP-2024-1524",
    candidateId: "C-2024-0453",
    vacancyId: sampleVacancy.id,
    stage: "Hired",
    score: 95,
    notes: "Offer accepted.",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-03-10"),
  },
  {
    id: "SP-2024-1525",
    candidateId: "C-2024-0455",
    vacancyId: sampleVacancy.id,
    stage: "Rejected",
    score: 81,
    notes: "Position requirements changed.",
    createdAt: new Date("2024-02-15"),
    updatedAt: new Date("2024-03-12"),
  },
];

function requireElement<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) {
    throw new Error(`Missing page element: ${selector}`);
  }
  return element;
}

const message = requireElement<HTMLParagraphElement>("#result-message");
const content = requireElement<HTMLDivElement>("#result-content");
const searchForm = requireElement<HTMLFormElement>("#search-form");
const filterForm = requireElement<HTMLFormElement>("#filter-form");
const sortForm = requireElement<HTMLFormElement>("#sort-form");

function renderCandidates(
  results: Candidate[],
  scores?: Map<string, number>,
): void {
  message.textContent = `${results.length} candidate${results.length === 1 ? "" : "s"} found.`;
  content.replaceChildren();

  if (results.length === 0) {
    return;
  }

  const tableWrapper = document.createElement("div");
  tableWrapper.className = "table-wrap";
  const table = document.createElement("table");
  const header = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const columns = [
    "Candidate",
    "Experience",
    "Seniority",
    "Skills",
    "English",
    "Expected salary",
    "Availability",
    "Status",
    ...(scores ? ["Match score"] : []),
  ];

  for (const column of columns) {
    const cell = document.createElement("th");
    cell.scope = "col";
    cell.textContent = column;
    headerRow.append(cell);
  }

  header.append(headerRow);
  table.append(header);
  const body = document.createElement("tbody");

  for (const candidate of results) {
    const row = document.createElement("tr");
    const values = [
      `${candidate.fullName} (${candidate.id})`,
      `${candidate.yearsOfExperience} years`,
      candidate.seniority,
      candidate.skills.join(", "),
      candidate.englishLevel,
      `$${candidate.expectedSalary.toLocaleString()}`,
      candidate.availability,
      candidate.status,
      ...(scores ? [`${scores.get(candidate.id) ?? 0}/100`] : []),
    ];

    for (const value of values) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.append(cell);
    }

    body.append(row);
  }

  table.append(body);
  tableWrapper.append(table);
  content.append(tableWrapper);
}

function renderReport(report: object): void {
  message.textContent = "Selection report for the sample dataset.";
  content.replaceChildren();

  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(report, null, 2);
  content.append(pre);
}

function readInput<T extends HTMLInputElement | HTMLSelectElement>(
  selector: string,
): T {
  return requireElement<T>(selector);
}

searchForm.addEventListener("submit", (event: SubmitEvent): void => {
  event.preventDefault();
  const field = readInput<HTMLSelectElement>("#search-field").value;
  const query = readInput<HTMLInputElement>("#search-query").value.trim();
  const match =
    field === "email"
      ? findCandidateByEmail(candidates, query)
      : findCandidateById(candidates, query);
  renderCandidates(match ? [match] : []);
});

filterForm.addEventListener("submit", (event: SubmitEvent): void => {
  event.preventDefault();
  const skills = readInput<HTMLInputElement>("#filter-skills")
    .value.split(",")
    .map((skill) => skill.trim())
    .filter(Boolean);
  const seniority = readInput<HTMLSelectElement>("#filter-seniority").value;
  const availability = readInput<HTMLSelectElement>(
    "#filter-availability",
  ).value;

  let results = filterCandidatesBySkills(candidates, skills);
  if (seniority) {
    results = filterCandidatesBySeniority(
      results,
      seniority as SeniorityLevel,
    );
  }
  if (availability) {
    results = filterCandidatesByAvailability(results, [
      availability as AvailabilityStatus,
    ]);
  }

  renderCandidates(results);
});

sortForm.addEventListener("submit", (event: SubmitEvent): void => {
  event.preventDefault();
  const field = readInput<HTMLSelectElement>("#sort-field").value;
  const order = readInput<HTMLSelectElement>("#sort-order").value as
    | "asc"
    | "desc";
  const sorted =
    field === "experience"
      ? sortCandidatesByExperience(candidates, order)
      : sortCandidatesBySalary(candidates, order);
  renderCandidates(sorted);
});

document.querySelector<HTMLButtonElement>("#rank-button")?.addEventListener(
  "click",
  (): void => {
    const ranked = rankCandidatesForVacancy(candidates, sampleVacancy);
    const scores = new Map(
      ranked.map(({ candidate, score }) => [candidate.id, score]),
    );
    renderCandidates(
      ranked.map(({ candidate }) => candidate),
      scores,
    );
  },
);

document.querySelector<HTMLButtonElement>("#report-button")?.addEventListener(
  "click",
  (): void => {
    renderReport({
      candidateCount: candidates.length,
      candidatesByStatus: countCandidatesByStatus(candidates),
      averageExpectedSalary: calculateAverageSalary(candidates),
      topSkills: findTopSkills(candidates, 5),
      vacancyFillRate: `${calculateVacancyFillRate(sampleProcesses)}%`,
    });
  },
);

document.querySelector<HTMLButtonElement>("#reset-button")?.addEventListener(
  "click",
  (): void => renderCandidates(candidates),
);

renderCandidates(candidates);
