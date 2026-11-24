import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { content, paths, type Locale } from '../content';
import { initMobileMenus } from '../legacy/navigation.js';

interface HeaderProps {
  locale: Locale;
  page: 'home' | 'talent';
}

const linkClass =
  'hover:text-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-700';

export default function Header({ locale, page }: HeaderProps) {
  const c = content[locale];

  // Connect the legacy navigation.js behaviour (close on link click / outside click / Escape).
  useEffect(() => initMobileMenus(), []);

  const links = (
    <>
      <Link className={linkClass} to={paths[locale].home} aria-current={page === 'home' ? 'page' : undefined}>
        {c.nav.home}
      </Link>
      <Link className={linkClass} to={{ pathname: paths[locale].home, hash: 'services' }}>
        {c.nav.services}
      </Link>
      <Link className={linkClass} to={paths[locale].talent} aria-current={page === 'talent' ? 'page' : undefined}>
        {c.nav.talent}
      </Link>
      <Link className={linkClass} to={{ pathname: paths[locale][page], hash: 'contact' }}>
        {c.nav.contact}
      </Link>
    </>
  );

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-5 px-5 py-5 sm:px-8">
        <Link className="text-2xl font-black tracking-tight text-teal-900" to={paths[locale].home}>
          Nexova<span className="text-amber-600">.</span>
        </Link>

        <nav aria-label={c.nav.label} className="hidden items-center gap-x-6 text-sm font-bold lg:flex">
          {links}
        </nav>

        <div className="flex items-center gap-5">
          <div role="group" className="flex gap-3 text-sm font-bold" aria-label={c.language}>
            <Link to={paths.en[page]} lang="en" hrefLang="en" aria-current={locale === 'en' ? 'page' : undefined}>EN</Link>
            <span aria-hidden="true">/</span>
            <Link to={paths.es[page]} lang="es" hrefLang="es" aria-current={locale === 'es' ? 'page' : undefined}>ES</Link>
          </div>

          <details data-mobile-menu className="relative lg:hidden">
            <summary className="flex min-h-11 cursor-pointer list-none items-center rounded-lg border border-slate-300 px-4 text-sm font-bold text-slate-800">
              {c.nav.menu}
            </summary>
            <nav
              aria-label={c.nav.label}
              className="absolute right-0 z-40 mt-2 flex w-56 flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 text-sm font-bold shadow-lg"
            >
              {links}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
