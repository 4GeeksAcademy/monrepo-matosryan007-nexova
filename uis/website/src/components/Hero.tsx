import { Link } from 'react-router-dom';
import { content, paths, type Locale } from '../content';

export default function Hero({ locale }: { locale: Locale }) {
  const c = content[locale].home;
  return (
    <section className="overflow-hidden bg-teal-950 px-5 py-20 text-white sm:px-8 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="mb-6 text-sm font-bold uppercase tracking-widest text-teal-200">{c.eyebrow}</p>
          <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">{c.heading}</h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-teal-100">{c.description}</p>
          <Link
            to={paths[locale].talent}
            className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-amber-300 px-6 py-4 font-bold text-slate-950 hover:bg-amber-200 focus-visible:outline focus-visible:outline-4 focus-visible:outline-offset-4 focus-visible:outline-white"
          >
            {c.cta} <span className="ml-4" aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="rounded-3xl border border-teal-700 bg-teal-900 p-8 sm:p-10">
          <p className="text-6xl font-black text-amber-300">{c.stat.value}</p>
          <p className="mt-3 text-xl font-bold">{c.stat.label}</p>
          <p className="mt-6 leading-7 text-teal-100">{c.stat.text}</p>
          <p className="mt-8 border-t border-teal-700 pt-6 text-sm text-teal-200">{c.stat.footnote}</p>
        </div>
      </div>
    </section>
  );
}
