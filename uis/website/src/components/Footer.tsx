import { CONTACT, content, type Locale } from '../content';

export default function Footer({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <footer className="bg-slate-950 px-5 py-10 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-6">
        <p>© {new Date().getFullYear()} Nexova. {c.footer.rights}</p>
        <nav className="flex gap-6" aria-label={c.footer.social}>
          <a className="underline" href={CONTACT.linkedin}>LinkedIn</a>
          <a className="underline" href={CONTACT.instagram}>Instagram</a>
        </nav>
      </div>
    </footer>
  );
}
