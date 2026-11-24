import { useEffect, useRef } from 'react';
import { content, type Locale } from '../../content';
import { initTalentForm } from '../../legacy/validation.js';
import { ErrorText, Field, SelectField, inputClass } from './fields';

const buttonClass =
  'inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-700 px-6 py-3 font-bold text-white hover:bg-teal-800 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-teal-500';

export default function TalentForm({ locale }: { locale: Locale }) {
  const { success, form: f } = content[locale].talent;
  const formRef = useRef<HTMLFormElement>(null);

  // Connect the legacy validation.js once the form is in the DOM; cleanup removes its listeners.
  useEffect(() => (formRef.current ? initTalentForm(formRef.current) : undefined), []);

  return (
    <div>
      <section
        id="success-message"
        hidden
        tabIndex={-1}
        role="status"
        className="mb-6 rounded-2xl border border-teal-600 bg-teal-50 p-7 text-teal-950"
      >
        <h2 className="text-2xl font-bold">{success.heading}</h2>
        <p className="mt-4 leading-7">{success.received}</p>
        <p className="mt-4 leading-7">{success.linkedin}</p>
        <a className="mt-4 inline-block font-bold underline" href="https://linkedin.com/company/nexova">LinkedIn</a>
        <p className="mt-4 text-sm">{success.simulated}</p>
      </section>

      <form
        ref={formRef}
        id="talent-form"
        data-locale={locale}
        noValidate
        className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-9"
      >
        <div id="error-summary" hidden role="alert" className="mb-8 rounded-xl border border-red-300 bg-red-50 p-5 text-red-900">
          <h2 className="font-bold">{f.errorsHeading}</h2>
          <ul id="error-list" className="mt-3 list-disc space-y-2 pl-5" />
        </div>
        <p className="mb-8 text-sm">{f.required}</p>

        <fieldset>
          <legend className="mb-6 text-xl font-black text-slate-950">01 / {f.contactLegend}</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field name="fullName" label={f.fullName} autoComplete="name" />
            <Field name="email" label={f.email} type="email" autoComplete="email" />
            <Field name="phone" label={f.phone} type="tel" autoComplete="tel" placeholder="+34 612 345 678" />
            <SelectField name="country" label={f.country} placeholder={f.selectPlaceholder} options={f.countries} />
          </div>
        </fieldset>

        <fieldset className="mt-10">
          <legend className="mb-6 text-xl font-black text-slate-950">02 / {f.profileLegend}</legend>
          <div className="grid gap-6 sm:grid-cols-2">
            <Field name="experience" label={f.experience} type="number" min={0} max={50} step="any" />
            <SelectField name="sector" label={f.sector} placeholder={f.selectPlaceholder} options={f.sectors} />
            <SelectField name="english" label={f.english} placeholder={f.selectPlaceholder} options={f.englishLevels} />
            <Field
              name="linkedin"
              label={f.linkedin}
              optionalLabel={f.optional}
              type="url"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
        </fieldset>

        <fieldset className="mt-8" aria-describedby="availability-error">
          <legend className="font-bold text-slate-900">{f.availability} *</legend>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {f.availabilities.map((o, i) => (
              <label key={o.value} className="flex min-h-12 cursor-pointer items-center gap-3 rounded-xl border border-slate-300 p-4">
                <input
                  id={`availability-${i}`}
                  name="availability"
                  value={o.value}
                  type="radio"
                  required
                  aria-describedby="availability-error"
                  className="size-5 accent-teal-700"
                />
                {o.label}
              </label>
            ))}
          </div>
          <ErrorText name="availability" />
        </fieldset>

        <div className="mt-8">
          <label htmlFor="comments" className="font-bold text-slate-900">{f.comments}</label>
          <textarea
            id="comments"
            name="comments"
            rows={4}
            maxLength={500}
            aria-describedby="comments-count comments-error"
            className={inputClass}
          />
          <p id="comments-count" className="mt-2 text-sm" aria-live="polite" />
          <ErrorText name="comments" />
        </div>

        <details id="data-policy" className="mt-6 rounded-xl bg-slate-50 p-4">
          <summary className="cursor-pointer font-bold text-teal-900">{f.policyTitle}</summary>
          <p className="mt-3 text-sm leading-6">{f.policyText}</p>
        </details>

        <div className="mt-6">
          <label className="flex items-start gap-3 font-semibold text-slate-900">
            <input
              className="mt-1 size-5 shrink-0 accent-teal-700"
              type="checkbox"
              id="dataPolicy"
              name="dataPolicy"
              required
              aria-describedby="dataPolicy-error"
            />
            <span>{f.accept} *</span>
          </label>
          <ErrorText name="dataPolicy" />
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <button type="submit" className={buttonClass}>{f.submit}</button>
          <button
            id="clear-form"
            type="reset"
            className="min-h-12 rounded-xl border border-slate-400 px-6 py-3 font-bold text-slate-800 hover:bg-slate-100"
          >
            {f.clear}
          </button>
        </div>

        <noscript>
          <p className="mt-4 font-bold text-red-700">{f.noscript}</p>
        </noscript>
      </form>
    </div>
  );
}
