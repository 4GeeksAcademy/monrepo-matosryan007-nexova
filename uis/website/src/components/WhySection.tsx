import { content, type Locale } from '../content';

export default function WhySection({ locale }: { locale: Locale }) {
  const c = content[locale].home.why;
  return (
    <section id="why-nexova" className="bg-white px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-black text-slate-950">{c.heading}</h2>
        <p className="mt-4 max-w-2xl leading-7">{c.intro}</p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {c.items.map((item) => (
            <article key={item.title} className="rounded-2xl bg-teal-50 p-7">
              <h3 className="text-xl font-bold text-teal-950">{item.title}</h3>
              <p className="mt-2">{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
