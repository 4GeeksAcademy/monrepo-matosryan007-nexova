import { CONTACT, content, type Locale } from '../content';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import TalentForm from '../components/form/TalentForm';

export default function TalentPage({ locale }: { locale: Locale }) {
  const c = content[locale].talent;
  return (
    <Layout locale={locale} page="talent">
      <Seo locale={locale} page="talent" title={c.title} description={c.description} />
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm font-bold uppercase tracking-widest text-teal-700">{c.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">{c.title}</h1>
          <p className="mt-5 text-lg leading-8">{c.intro}</p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[1fr_2fr]">
          <aside className="rounded-3xl bg-teal-950 p-7 text-white">
            <h2 className="text-xl font-bold">{c.asideHeading}</h2>
            <p className="mt-4 leading-7 text-teal-100">{c.asideText}</p>
            <p className="mt-6 border-t border-teal-700 pt-6 leading-7">
              {c.asideCompany}{' '}
              <a className="break-words font-bold text-amber-300 underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            </p>
            <p className="mt-6 text-sm text-teal-100">{c.asideDemo}</p>
          </aside>
          <TalentForm locale={locale} />
        </div>
      </div>
    </Layout>
  );
}
