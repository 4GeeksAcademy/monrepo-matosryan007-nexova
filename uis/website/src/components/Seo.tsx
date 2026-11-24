import { useEffect } from 'react';
import { SITE_URL, paths, type Locale } from '../content';

interface SeoProps {
  locale: Locale;
  page: 'home' | 'talent';
  title: string;
  description: string;
  ogTitle?: string;
}

/** Per-page head tags. React 19 hoists <meta>/<link> into <head>. */
export default function Seo({ locale, page, title, description, ogTitle }: SeoProps) {
  const fullTitle = `${title} | Nexova`;
  useEffect(() => {
    document.title = fullTitle;
    document.documentElement.lang = locale;
  }, [fullTitle, locale]);

  const url = (l: Locale) => `${SITE_URL}${paths[l][page]}`;

  return (
    <>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${ogTitle ?? title} | Nexova`} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={url(locale)} />
      <link rel="alternate" hrefLang="en" href={url('en')} />
      <link rel="alternate" hrefLang="es" href={url('es')} />
      <link rel="alternate" hrefLang="x-default" href={url('en')} />
    </>
  );
}
