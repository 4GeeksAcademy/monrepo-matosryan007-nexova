import type { InputHTMLAttributes } from 'react';

// NOTE: the legacy validation.js owns the error/aria state of these controls by
// toggling classes and attributes directly on the DOM. These components are
// deliberately uncontrolled and static so React never re-renders over that state.

export const inputClass =
  'mt-2 block min-h-12 w-full rounded-xl border border-slate-400 bg-white px-4 py-3 text-slate-950 focus:border-teal-700 focus:outline focus:outline-2 focus:outline-teal-700';

export function ErrorText({ name }: { name: string }) {
  return <p id={`${name}-error`} data-error-for={name} className="mt-2 hidden text-sm font-semibold text-red-700" />;
}

interface FieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  /** Optional fields do not render the required asterisk or attribute. */
  optionalLabel?: string;
}

export function Field({ name, label, optionalLabel, type = 'text', ...rest }: FieldProps) {
  const required = !optionalLabel;
  return (
    <div>
      <label className="font-bold text-slate-900" htmlFor={name}>
        {optionalLabel ? `${label} (${optionalLabel})` : label}
        {required && <> <span aria-hidden="true">*</span></>}
      </label>
      <input
        className={inputClass}
        id={name}
        name={name}
        type={type}
        required={required}
        aria-describedby={`${name}-error`}
        {...rest}
      />
      <ErrorText name={name} />
    </div>
  );
}

interface SelectFieldProps {
  name: string;
  label: string;
  placeholder: string;
  options: readonly { value: string; label: string }[];
}

export function SelectField({ name, label, placeholder, options }: SelectFieldProps) {
  return (
    <div>
      <label className="font-bold text-slate-900" htmlFor={name}>
        {label} <span aria-hidden="true">*</span>
      </label>
      <select className={inputClass} id={name} name={name} required aria-describedby={`${name}-error`} defaultValue="">
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <ErrorText name={name} />
    </div>
  );
}
