"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { listCandidates } from "@/lib/api";
import {
  STAGES, STAGE_LABELS, STATUSES, STATUS_LABELS, stageLabel, statusLabel,
  type Candidate,
} from "@/lib/types";
import { CandidateDetail } from "./candidate-detail";
import { CandidateForm } from "./candidate-form";

const LIMIT = 20;

const STATUS_STYLES: Record<string, string> = {
  received: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  in_progress: "bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200",
  selected: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-200",
  discarded: "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-200",
};

const filterCls =
  "rounded-md border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900";

export function Tracker() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("");
  const [stage, setStage] = useState("");
  const [page, setPage] = useState(1);
  const [result, setResult] = useState<{
    key: string; rows: Candidate[]; total: number; error: string | null;
  }>({ key: "", rows: [], total: 0, error: null });
  const [selected, setSelected] = useState<Candidate | null>(null);
  const [creating, setCreating] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: "ok" | "error" } | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const notify = useCallback((msg: string, kind: "ok" | "error" = "ok") => {
    setToast({ msg, kind });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 4000);
  }, []);

  // Debounce search input.
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(search.trim());
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const [reloadKey, setReloadKey] = useState(0);
  const requestKey = JSON.stringify([status, stage, query, page, reloadKey]);
  useEffect(() => {
    const ctrl = new AbortController();
    listCandidates({ status, stage, search: query, page, limit: LIMIT }, ctrl.signal)
      .then((res) =>
        setResult({ key: requestKey, rows: res.data, total: res.total, error: null }),
      )
      .catch((e) => {
        if (e?.name === "AbortError") return;
        setResult((r) => ({ ...r, key: requestKey, error: e.message ?? "Couldn't load candidates." }));
      });
    return () => ctrl.abort();
  }, [status, stage, query, page, reloadKey, requestKey]);

  const { rows, total, error } = result;
  const loading = result.key !== requestKey;

  const pages = Math.max(1, Math.ceil(total / LIMIT));
  const hasFilters = !!(status || stage || search);

  function applyChange(c: Candidate) {
    setResult((r) => ({ ...r, rows: r.rows.map((x) => (x.id === c.id ? { ...x, ...c } : x)) }));
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Talent Pipeline</h1>
          <p className="text-sm text-slate-500">Executive Assistant · Valencia headquarters</p>
        </div>
        <button onClick={() => setCreating(true)} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
          + New candidate
        </button>
      </header>

      <div className="mb-4 flex flex-wrap gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email"
          aria-label="Search by name or email"
          className={`${filterCls} min-w-64 flex-1`}
        />
        <select aria-label="Filter by status" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }} className={filterCls}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
        </select>
        <select aria-label="Filter by stage" value={stage} onChange={(e) => { setStage(e.target.value); setPage(1); }} className={filterCls}>
          <option value="">All stages</option>
          {STAGES.map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
        </select>
        {hasFilters && (
          <button onClick={() => { setSearch(""); setStatus(""); setStage(""); }} className="px-2 text-sm text-indigo-600 hover:underline">
            Clear filters
          </button>
        )}
      </div>

      <p className="mb-2 text-sm text-slate-500" role="status" aria-live="polite">
        {loading ? "Loading candidates…" : error ? "" : `${total} candidate${total === 1 ? "" : "s"}`}
      </p>

      {error && (
        <div role="alert" className="mb-4 flex items-center justify-between rounded-md bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          <span>{error}</span>
          <button onClick={() => setReloadKey((k) => k + 1)} className="font-medium underline">Retry</button>
        </div>
      )}

      <div className={`overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 ${loading ? "opacity-60" : ""}`}>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-900">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Position</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Stage</th>
              <th className="px-4 py-3 text-right">Notes</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {loading && rows.length === 0 &&
              Array.from({ length: 6 }, (_, i) => (
                <tr key={i}>
                  <td colSpan={5} className="px-4 py-4"><div className="h-4 animate-pulse rounded bg-slate-200 dark:bg-slate-800" /></td>
                </tr>
              ))}
            {!loading && !error && rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-12 text-center text-slate-500">
                  {hasFilters ? "No candidates match your filters." : "No candidates yet."}
                </td>
              </tr>
            )}
            {rows.map((c) => (
              <tr key={c.id} onClick={() => setSelected(c)} className="cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900">
                <td className="px-4 py-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setSelected(c); }}
                    className="text-left font-medium hover:text-indigo-600 focus-visible:outline-2"
                  >
                    {c.full_name}
                  </button>
                  <div className="text-xs text-slate-500">{c.email}</div>
                </td>
                <td className="px-4 py-3">{c.position}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[c.status] ?? STATUS_STYLES.received}`}>
                    {statusLabel(c.status)}
                  </span>
                </td>
                <td className="px-4 py-3">{stageLabel(c.stage)}</td>
                <td className="px-4 py-3 text-right text-slate-500">{c.notes_count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {total > LIMIT && (
        <nav className="mt-4 flex items-center justify-between text-sm" aria-label="Pagination">
          <button disabled={page <= 1 || loading} onClick={() => setPage((p) => p - 1)} className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-40 dark:border-slate-700">Previous</button>
          <span className="text-slate-500">Page {page} of {pages}</span>
          <button disabled={page >= pages || loading} onClick={() => setPage((p) => p + 1)} className="rounded-md border border-slate-300 px-3 py-1.5 disabled:opacity-40 dark:border-slate-700">Next</button>
        </nav>
      )}

      {selected && (
        <CandidateDetail
          key={selected.id}
          summary={selected}
          onChange={applyChange}
          onClose={() => { setSelected(null); setReloadKey((k) => k + 1); }}
          notify={notify}
        />
      )}

      {creating && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/40 p-4" onClick={() => setCreating(false)}>
          <div role="dialog" aria-modal="true" aria-label="New candidate" onClick={(e) => e.stopPropagation()} className="max-h-full w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl dark:bg-slate-950">
            <h2 className="mb-4 text-lg font-semibold">New candidate</h2>
            <CandidateForm
              onCancel={() => setCreating(false)}
              onSaved={(c) => {
                setCreating(false);
                setReloadKey((k) => k + 1);
                notify(`${c.full_name} registered`);
              }}
            />
          </div>
        </div>
      )}

      {toast && (
        <div role="status" className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-md px-4 py-2 text-sm text-white shadow-lg ${toast.kind === "error" ? "bg-red-600" : "bg-slate-900"}`}>
          {toast.msg}
        </div>
      )}
    </div>
  );
}
