import type { Candidate, CandidateInput, ListResponse, Note } from "./types";

const BASE = (
  process.env.NEXT_PUBLIC_API_URL || "https://playground.4geeks.com/tracker/api/v1"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      ...init,
      headers: { "Content-Type": "application/json", ...init?.headers },
    });
  } catch (e) {
    if (e instanceof DOMException && e.name === "AbortError") throw e;
    throw new ApiError("Can't reach the server. Check your connection and try again.");
  }
  if (!res.ok) {
    let msg = `Request failed (${res.status}).`;
    try {
      const body = await res.json();
      if (typeof body?.error === "string") {
        const extra = body.details && typeof body.details === "object" ? Object.values(body.details).join("; ") : "";
        msg = extra ? `${body.error}: ${extra}` : body.error;
      } else if (typeof body?.detail === "string") msg = body.detail;
      else if (Array.isArray(body?.detail))
        msg = body.detail
          .map((d: { loc?: unknown[]; msg: string }) => `${d.loc?.slice(1).join(".") ?? ""} ${d.msg}`.trim())
          .join("; ");
    } catch {}
    throw new ApiError(msg, res.status);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export interface ListParams {
  status?: string;
  stage?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export function listCandidates(p: ListParams, signal?: AbortSignal) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(p)) if (v) q.set(k, String(v));
  return request<ListResponse>(`/records?${q}`, { signal });
}

export const getCandidate = (id: string, signal?: AbortSignal) =>
  request<Candidate>(`/records/${id}`, { signal });

export const createCandidate = (input: CandidateInput) =>
  request<Candidate>("/records", { method: "POST", body: JSON.stringify(input) });

export const replaceCandidate = (id: string, input: CandidateInput) =>
  request<Candidate>(`/records/${id}`, { method: "PUT", body: JSON.stringify(input) });

export const patchCandidate = (id: string, body: { status?: string; stage?: string }) =>
  request<Candidate>(`/records/${id}`, { method: "PATCH", body: JSON.stringify(body) });

export const listNotes = (id: string, signal?: AbortSignal) =>
  request<Note[] | { data: Note[] }>(`/records/${id}/notes`, { signal }).then((r) =>
    Array.isArray(r) ? r : r.data,
  );

export const addNote = (id: string, content: string) =>
  request<Note>(`/records/${id}/notes`, { method: "POST", body: JSON.stringify({ content }) });

export const deleteNote = (id: string, noteId: string) =>
  request<void>(`/records/${id}/notes/${noteId}`, { method: "DELETE" });
