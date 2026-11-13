export const STATUSES = ["received", "in_progress", "selected", "discarded"] as const;
export const STAGES = [
  "pending",
  "review",
  "personal_interview",
  "technical_interview",
  "offer_presented",
] as const;

export type Status = (typeof STATUSES)[number];
export type Stage = (typeof STAGES)[number];

// Raw API values must never be shown in the UI — always go through these labels.
export const STATUS_LABELS: Record<Status, string> = {
  received: "Received",
  in_progress: "In progress",
  selected: "Selected",
  discarded: "Discarded",
};

export const STAGE_LABELS: Record<Stage, string> = {
  pending: "Pending review",
  review: "Under review",
  personal_interview: "Personal interview",
  technical_interview: "Technical interview",
  offer_presented: "Offer presented",
};

export const statusLabel = (v: string) => STATUS_LABELS[v as Status] ?? "Unknown";
export const stageLabel = (v: string) => STAGE_LABELS[v as Stage] ?? "Unknown";

export interface Note {
  id: string;
  record_id: string;
  content: string;
  created_at: string;
}

export interface Candidate {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  status: string;
  stage: string;
  experience_years: number;
  notes_count: number;
  notes?: Note[];
  applied_at: string;
  updated_at: string;
}

export interface CandidateInput {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  linkedin_url: string | null;
  cv_url: string | null;
  experience_years: number;
}

export interface ListResponse {
  total: number;
  page: number;
  limit: number;
  data: Candidate[];
}
