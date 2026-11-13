"use client";

import { useState } from "react";
import { createCandidate, replaceCandidate } from "@/lib/api";
import type { Candidate, CandidateInput } from "@/lib/types";

const field =
  "w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100";

function Field({
  name, label, type = "text", defaultValue, required = true, step, disabled, errors,
}: {
  name: string; label: string; type?: string; defaultValue?: string | number | null;
  required?: boolean; step?: string; disabled: boolean; errors: Record<string, string>;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">
        {label}{required ? " *" : " (optional)"}
      </span>
      <input
        name={name}
        type={type}
        step={step}
        min={type === "number" ? 0 : undefined}
        defaultValue={defaultValue ?? ""}
        disabled={disabled}
        aria-invalid={!!errors[name]}
        className={field}
      />
      {errors[name] && <span className="mt-1 block text-xs text-red-600">{errors[name]}</span>}
    </label>
  );
}

export function CandidateForm({
  candidate,
  onSaved,
  onCancel,
}: {
  candidate?: Candidate;
  onSaved: (c: Candidate) => void;
  onCancel: () => void;
}) {
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = (k: string) => String(f.get(k) ?? "").trim();
    const input: CandidateInput = {
      full_name: s("full_name"),
      email: s("email"),
      phone: s("phone"),
      position: s("position"),
      linkedin_url: s("linkedin_url") || null,
      cv_url: s("cv_url") || null,
      experience_years: Number(s("experience_years")),
    };
    const errs: Record<string, string> = {};
    if (!input.full_name) errs.full_name = "Required";
    if (!/^\S+@\S+\.\S+$/.test(input.email)) errs.email = "Enter a valid email";
    if (!input.phone) errs.phone = "Required";
    if (!input.position) errs.position = "Required";
    if (s("experience_years") === "" || !Number.isFinite(input.experience_years) || input.experience_years < 0)
      errs.experience_years = "Enter 0 or more";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    setError(null);
    try {
      const saved = candidate
        ? await replaceCandidate(candidate.id, input)
        : await createCandidate(input);
      onSaved(saved);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setSaving(false);
    }
  }

  const d = candidate;
  const p = { disabled: saving, errors };

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <Field {...p} name="full_name" label="Full name" defaultValue={d?.full_name} />
      <Field {...p} name="email" label="Email" type="email" defaultValue={d?.email} />
      <Field {...p} name="phone" label="Phone" type="tel" defaultValue={d?.phone} />
      <Field {...p} name="position" label="Position" defaultValue={d?.position ?? "Executive Assistant"} />
      <Field {...p} name="experience_years" label="Years of experience" type="number" step="0.5" defaultValue={d?.experience_years} />
      <Field {...p} name="linkedin_url" label="LinkedIn URL" type="url" defaultValue={d?.linkedin_url} required={false} />
      <Field {...p} name="cv_url" label="CV URL" type="url" defaultValue={d?.cv_url} required={false} />
      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700 dark:bg-red-950 dark:text-red-300">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} disabled={saving} className="rounded-md px-4 py-2 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800">
          Cancel
        </button>
        <button type="submit" disabled={saving} className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60">
          {saving ? "Saving…" : candidate ? "Save changes" : "Register candidate"}
        </button>
      </div>
    </form>
  );
}
