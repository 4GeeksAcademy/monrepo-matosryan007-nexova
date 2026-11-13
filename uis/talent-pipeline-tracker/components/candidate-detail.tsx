"use client";

import { useCallback, useEffect, useState } from "react";
import { addNote, deleteNote, getCandidate, patchCandidate } from "@/lib/api";
import {
  STAGES, STAGE_LABELS, STATUSES, STATUS_LABELS,
  type Candidate, type Note,
} from "@/lib/types";
import { CandidateForm } from "./candidate-form";

const select =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });

export function CandidateDetail({
  summary,
  onChange,
  onClose,
  notify,
}: {
  summary: Candidate;
  onChange: (c: Candidate) => void;
  onClose: () => void;
  notify: (msg: string, kind?: "ok" | "error") => void;
}) {
  const [c, setC] = useState<Candidate>(summary);
  const [notes, setNotes] = useState<Note[] | null>(summary.notes ?? null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [draft, setDraft] = useState("");
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);

  const load = useCallback(
    (signal?: AbortSignal) => {
      getCandidate(summary.id, signal)
        .then((full) => {
          setC(full);
          setNotes(full.notes ?? []);
          setLoading(false);
        })
        .catch((e) => {
          if (e?.name === "AbortError") return;
          setLoadError(e.message);
          setLoading(false);
        });
    },
    [summary.id],
  );

  useEffect(() => {
    const ctrl = new AbortController();
    load(ctrl.signal);
    return () => ctrl.abort();
  }, [load]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !editing && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, editing]);

  function sync(next: Candidate) {
    const merged = { ...c, ...next, notes: notes ?? undefined, notes_count: notes?.length ?? next.notes_count };
    setC(merged);
    onChange(merged);
  }

  async function update(field: "status" | "stage", value: string) {
    const prev = c;
    setUpdating(true);
    setC({ ...c, [field]: value }); // optimistic
    try {
      const next = await patchCandidate(c.id, { [field]: value });
      sync(next);
      notify("Candidate updated");
    } catch (e) {
      setC(prev);
      notify(e instanceof Error ? e.message : "Update failed", "error");
    } finally {
      setUpdating(false);
    }
  }

  async function submitNote(e: React.FormEvent) {
    e.preventDefault();
    const content = draft.trim();
    if (!content) return;
    setAdding(true);
    try {
      const note = await addNote(c.id, content);
      const next = [note, ...(notes ?? [])];
      setNotes(next);
      setDraft("");
      onChange({ ...c, notes: next, notes_count: next.length });
      setC((x) => ({ ...x, notes_count: next.length }));
      notify("Note added");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Couldn't add note", "error");
    } finally {
      setAdding(false);
    }
  }

  async function removeNote(id: string) {
    if (!window.confirm("Delete this note? This can't be undone.")) return;
    setDeleting(id);
    try {
      await deleteNote(c.id, id);
      const next = (notes ?? []).filter((n) => n.id !== id);
      setNotes(next);
      onChange({ ...c, notes: next, notes_count: next.length });
      setC((x) => ({ ...x, notes_count: next.length }));
      notify("Note deleted");
    } catch (e) {
      notify(e instanceof Error ? e.message : "Couldn't delete note", "error");
    } finally {
      setDeleting(null);
    }
  }

  const sortedNotes = [...(notes ?? [])].sort((a, b) => b.created_at.localeCompare(a.created_at));

  return (
    <div className="fixed inset-0 z-40 flex justify-end bg-slate-900/40" onClick={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label={`${c.full_name} details`}
        onClick={(e) => e.stopPropagation()}
        className="h-full w-full max-w-xl overflow-y-auto bg-white p-6 shadow-xl dark:bg-slate-950"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold">{c.full_name}</h2>
            <p className="text-sm text-slate-500">{c.position}</p>
          </div>
          <button onClick={onClose} aria-label="Close" className="rounded-md px-2 py-1 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            ✕
          </button>
        </div>

        {editing ? (
          <CandidateForm
            candidate={c}
            onCancel={() => setEditing(false)}
            onSaved={(saved) => {
              setEditing(false);
              sync(saved);
              notify("Candidate saved");
              load();
            }}
          />
        ) : (
          <>
            <div className="grid grid-cols-2 gap-4">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-500">Status</span>
                <select className={select} value={c.status} disabled={updating} onChange={(e) => update("status", e.target.value)}>
                  {!STATUSES.includes(c.status as never) && <option value={c.status}>Unknown</option>}
                  {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-500">Stage</span>
                <select className={select} value={c.stage} disabled={updating} onChange={(e) => update("stage", e.target.value)}>
                  {!STAGES.includes(c.stage as never) && <option value={c.stage}>Unknown</option>}
                  {STAGES.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
                </select>
              </label>
            </div>

            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
              <dt className="text-slate-500">Email</dt>
              <dd className="break-all"><a className="text-indigo-600 hover:underline" href={`mailto:${c.email}`}>{c.email}</a></dd>
              <dt className="text-slate-500">Phone</dt>
              <dd>{c.phone}</dd>
              <dt className="text-slate-500">Experience</dt>
              <dd>{c.experience_years} {c.experience_years === 1 ? "year" : "years"}</dd>
              <dt className="text-slate-500">LinkedIn</dt>
              <dd className="break-all">{c.linkedin_url ? <a className="text-indigo-600 hover:underline" href={c.linkedin_url} target="_blank" rel="noopener noreferrer">{c.linkedin_url}</a> : "—"}</dd>
              <dt className="text-slate-500">CV</dt>
              <dd>{c.cv_url ? <a className="text-indigo-600 hover:underline" href={c.cv_url} target="_blank" rel="noopener noreferrer">Open CV</a> : "—"}</dd>
              <dt className="text-slate-500">Applied</dt>
              <dd>{fmt(c.applied_at)}</dd>
              <dt className="text-slate-500">Last updated</dt>
              <dd>{fmt(c.updated_at)}</dd>
            </dl>
            <button onClick={() => setEditing(true)} className="mt-4 rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
              Edit details
            </button>

            <section className="mt-8">
              <h3 className="mb-3 text-sm font-semibold">Internal notes {notes && `(${notes.length})`}</h3>
              <form onSubmit={submitNote} className="mb-4">
                <textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  disabled={adding}
                  rows={3}
                  placeholder="Add a note after a call or interview…"
                  className={select}
                />
                <div className="mt-2 flex justify-end">
                  <button disabled={adding || !draft.trim()} className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
                    {adding ? "Adding…" : "Add note"}
                  </button>
                </div>
              </form>

              {loading && !notes && <p className="text-sm text-slate-500" role="status">Loading notes…</p>}
              {loadError && (
                <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
                  {loadError}{" "}
                  <button className="underline" onClick={() => { setLoading(true); setLoadError(null); load(); }}>Retry</button>
                </p>
              )}
              {notes && notes.length === 0 && <p className="text-sm text-slate-500">No notes yet.</p>}
              <ul className="space-y-3">
                {sortedNotes.map((n) => (
                  <li key={n.id} className="rounded-md border border-slate-200 p-3 dark:border-slate-800">
                    <p className="whitespace-pre-wrap text-sm">{n.content}</p>
                    <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                      <span>{fmt(n.created_at)}</span>
                      <button onClick={() => removeNote(n.id)} disabled={deleting === n.id} className="text-red-600 hover:underline disabled:opacity-50">
                        {deleting === n.id ? "Deleting…" : "Delete"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </aside>
    </div>
  );
}
