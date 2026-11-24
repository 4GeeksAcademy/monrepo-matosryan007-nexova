import { CONTACT, SITE_URL, content, type Locale } from '../content';
import Hero from '../components/Hero';
import Layout from '../components/Layout';
import Seo from '../components/Seo';
import ServicesSection from '../components/ServicesSection';
import WhySection from '../components/WhySection';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Nexova',
  description: 'Human resources consulting and talent acquisition',
  url: SITE_URL,
  foundingDate: '2011',
  address: [
    { '@type': 'PostalAddress', addressCountry: 'ES', addressLocality: 'Valencia', addressRegion: 'Comunidad Valenciana' },
    { '@type': 'PostalAddress', addressCountry: 'US', addressLocality: 'Miami', addressRegion: 'Florida' },
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+34-960-123-456',
    contactType: 'customer service',
    availableLanguage: ['Spanish', 'English'],
  },
  sameAs: [CONTACT.linkedin, CONTACT.instagram],
};

export default function HomePage({ locale }: { locale: Locale }) {
  const c = content[locale].home;
  return (
    <Layout locale={locale} page="home">
      <Seo locale={locale} page="home" title={c.title} ogTitle={c.heading} description={c.description} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <Hero locale={locale} />
      <ServicesSection locale={locale} />
      <WhySection locale={locale} />
    </Layout>
  );
}
