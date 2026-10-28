import { Candidate, Vacancy } from "../types/models.js";

export function isValidEmail(email: string): boolean {
  if (typeof email !== "string") {
    return false;
  }

  const atIndex = email.indexOf("@");
  const dotIndex = email.lastIndexOf(".");

  return (
    atIndex > 0 &&
    atIndex === email.lastIndexOf("@") &&
    dotIndex > atIndex + 1 &&
    dotIndex < email.length - 1
  );
}

export function validateCandidate(
  candidate: Candidate,
): { valid: boolean; errors: string[] } {
  if (candidate === null || typeof candidate !== "object") {
    return { valid: false, errors: ["Candidate must be an object."] };
  }

  const errors: string[] = [];

  if (
    !Number.isFinite(candidate.yearsOfExperience) ||
    candidate.yearsOfExperience < 0 ||
    candidate.yearsOfExperience > 50
  ) {
    errors.push("Years of experience must be between 0 and 50.");
  }
  if (
    !Number.isFinite(candidate.currentSalary) ||
    candidate.currentSalary <= 0
  ) {
    errors.push("Current salary must be greater than 0.");
  }
  if (
    !Number.isFinite(candidate.expectedSalary) ||
    candidate.expectedSalary <= 0
  ) {
    errors.push("Expected salary must be greater than 0.");
  }
  if (!Array.isArray(candidate.skills) || candidate.skills.length === 0) {
    errors.push("At least one skill is required.");
  }
  if (!isValidEmail(candidate.email)) {
    errors.push("Email must be valid.");
  }
  if (typeof candidate.phone !== "string" || !candidate.phone.trim()) {
    errors.push("Phone must not be empty.");
  }

  return { valid: errors.length === 0, errors };
}

export function validateVacancy(
  vacancy: Vacancy,
): { valid: boolean; errors: string[] } {
  if (vacancy === null || typeof vacancy !== "object") {
    return { valid: false, errors: ["Vacancy must be an object."] };
  }

  const errors: string[] = [];

  if (
    !Array.isArray(vacancy.requiredSkills) ||
    vacancy.requiredSkills.length === 0
  ) {
    errors.push("At least one required skill is required.");
  }
  if (
    !Number.isFinite(vacancy.minYearsExperience) ||
    vacancy.minYearsExperience < 0
  ) {
    errors.push("Minimum years of experience must be at least 0.");
  }
  if (
    !Number.isFinite(vacancy.maxYearsExperience) ||
    vacancy.maxYearsExperience < vacancy.minYearsExperience
  ) {
    errors.push(
      "Maximum years of experience must be at least the minimum years of experience.",
    );
  }
  if (
    !Number.isFinite(vacancy.salaryRangeMin) ||
    vacancy.salaryRangeMin <= 0
  ) {
    errors.push("Minimum salary must be greater than 0.");
  }
  if (
    !Number.isFinite(vacancy.salaryRangeMax) ||
    vacancy.salaryRangeMax <= 0
  ) {
    errors.push("Maximum salary must be greater than 0.");
  }
  if (vacancy.salaryRangeMax < vacancy.salaryRangeMin) {
    errors.push("Maximum salary must be at least the minimum salary.");
  }

  return { valid: errors.length === 0, errors };
}
