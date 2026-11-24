import { CONTACT, content, type Locale } from '../content';

export default function ContactSection({ locale }: { locale: Locale }) {
  const c = content[locale].contact;
  return (
    <section id="contact" className="bg-amber-300 px-5 py-16 text-slate-950">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest">{c.eyebrow}</p>
          <h2 className="mt-3 text-3xl font-black">{c.heading}</h2>
        </div>
        <address className="space-y-3 text-lg not-italic">
          <p><a className="underline" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
          <p>Valencia: <a className="underline" href={CONTACT.valencia.href}>{CONTACT.valencia.label}</a></p>
          <p>Miami: <a className="underline" href={CONTACT.miami.href}>{CONTACT.miami.label}</a></p>
        </address>
      </div>
    </section>
  );
}
