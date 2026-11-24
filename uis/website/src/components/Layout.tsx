import type { ReactNode } from 'react';
import { content, type Locale } from '../content';
import ContactSection from './ContactSection';
import Footer from './Footer';
import Header from './Header';

interface LayoutProps {
  locale: Locale;
  page: 'home' | 'talent';
  children: ReactNode;
}

export default function Layout({ locale, page, children }: LayoutProps) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only rounded bg-white p-4 font-bold text-teal-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        {content[locale].skip}
      </a>
      <Header locale={locale} page={page} />
      <main id="main-content">{children}</main>
      <ContactSection locale={locale} />
      <Footer locale={locale} />
    </>
  );
}
