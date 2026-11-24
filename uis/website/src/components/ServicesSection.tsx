import { content, type Locale } from '../content';

interface ServiceCardProps {
  number: string;
  title: string;
  points: readonly string[];
}

function ServiceCard({ number, title, points }: ServiceCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="font-bold text-teal-700">{number}</p>
      <h3 className="mt-5 text-xl font-black text-slate-950">{title}</h3>
      <ul className="mt-5 list-disc space-y-4 pl-5 leading-7">
        {points.map((point) => <li key={point}>{point}</li>)}
      </ul>
    </article>
  );
}

export default function ServicesSection({ locale }: { locale: Locale }) {
  const c = content[locale].home.services;
  return (
    <section id="services" className="px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-bold uppercase tracking-widest text-teal-700">{c.eyebrow}</p>
        <h2 className="mt-3 text-3xl font-black text-slate-950 sm:text-4xl">{c.heading}</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <ServiceCard key={item.title} number={`0${i + 1}`} title={item.title} points={item.points} />
          ))}
        </div>
      </div>
    </section>
  );
}
