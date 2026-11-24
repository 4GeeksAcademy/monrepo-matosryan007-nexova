// All public copy, EN + ES. Copy is carried over from the M1 site (Nexova_Public_Website)
// and must stay aligned with BRIEFING.md.

export type Locale = 'en' | 'es';

type Option = { value: string; label: string };

export interface Content {
  lang: Locale;
  skip: string;
  nav: { label: string; home: string; services: string; talent: string; contact: string; menu: string };
  language: string;
  home: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    cta: string;
    stat: { value: string; label: string; text: string; footnote: string };
    services: {
      eyebrow: string;
      heading: string;
      items: { title: string; points: [string, string] }[];
    };
    why: { heading: string; intro: string; items: { title: string; text: string }[] };
  };
  talent: {
    title: string;
    description: string;
    eyebrow: string;
    intro: string;
    asideHeading: string;
    asideText: string;
    asideCompany: string;
    asideDemo: string;
    success: { heading: string; received: string; linkedin: string; simulated: string };
    form: {
      errorsHeading: string;
      required: string;
      contactLegend: string;
      profileLegend: string;
      fullName: string;
      email: string;
      phone: string;
      country: string;
      experience: string;
      sector: string;
      english: string;
      linkedin: string;
      optional: string;
      selectPlaceholder: string;
      availability: string;
      comments: string;
      policyTitle: string;
      policyText: string;
      accept: string;
      submit: string;
      clear: string;
      noscript: string;
      countries: Option[];
      sectors: Option[];
      englishLevels: Option[];
      availabilities: Option[];
    };
  };
  contact: { eyebrow: string; heading: string };
  footer: { rights: string; social: string };
}

const en: Content = {
  lang: 'en',
  skip: 'Skip to main content',
  nav: { label: 'Main navigation', home: 'Home', services: 'Services', talent: 'Talent', contact: 'Contact', menu: 'Menu' },
  language: 'Language',
  home: {
    title: 'Talent acquisition & HR consulting',
    description:
      'Human resources consulting and talent acquisition firm with over 10 years helping technology, retail, and financial services companies find and develop the best talent.',
    eyebrow: 'Valencia · Miami / People first, since 2011',
    heading: 'We build exceptional teams for growing companies',
    cta: 'Join our talent pool',
    stat: {
      value: '120',
      label: 'people. One shared purpose.',
      text: 'Find exceptional talent. Build dependable support teams. Develop tomorrow’s leaders.',
      footnote: 'Founded in 2011 · Human resources consulting',
    },
    services: {
      eyebrow: 'Our expertise',
      heading: 'Three services. Stronger teams.',
      items: [
        {
          title: 'Executive Headhunting',
          points: ['Search and selection of executive and mid-management profiles', 'Personalized process with replacement guarantee'],
        },
        {
          title: 'Customer Support Outsourcing',
          points: ['Specialized teams for technology companies', 'Continuous training and dedicated supervision'],
        },
        {
          title: 'Corporate Training',
          points: ['Soft skills and leadership programs', 'In-person and online courses adapted to each organization'],
        },
      ],
    },
    why: {
      heading: 'Why Nexova',
      intro: 'Specialist knowledge, a personal approach, and the reach to help your company grow.',
      items: [
        { title: '12 years of experience', text: 'In the Latin American market' },
        { title: 'Regional presence', text: 'Spain and United States' },
        { title: '+500 successful selection processes', text: 'Completed with care and sector expertise' },
        { title: 'Sector specialization', text: 'Technology, retail, and finance' },
      ],
    },
  },
  talent: {
    title: 'Join our talent pool',
    description:
      'Register your professional profile with Nexova for current and future job opportunities in technology, retail, finance and consulting.',
    eyebrow: 'Your next chapter',
    intro:
      'Actively looking or just exploring? Tell us about yourself so our selection team can match your profile with current and future opportunities.',
    asideHeading: 'A place for your potential',
    asideText: 'Register once to be considered for roles across our specialist sectors. All experience levels are welcome.',
    asideCompany: 'Are you a company looking for talent? Write to us at',
    asideDemo: 'Demo form: submission is simulated. Your information is not sent or stored.',
    success: {
      heading: 'Thank you for your interest in Nexova!',
      received:
        'We have received your information. Our selection team will review it and contact you if your profile matches any of our current or future opportunities.',
      linkedin: 'In the meantime, follow us on LinkedIn to stay updated on our vacancies and professional development content.',
      simulated: 'Simulated submission only; no information was transmitted.',
    },
    form: {
      errorsHeading: 'Please correct the following fields',
      required: 'Fields marked * are required.',
      contactLegend: 'Contact details',
      profileLegend: 'Professional profile',
      fullName: 'Full name',
      email: 'Email',
      phone: 'Phone',
      country: 'Country of residence',
      experience: 'Years of experience',
      sector: 'Sector of interest',
      english: 'English level',
      linkedin: 'LinkedIn',
      optional: 'optional',
      selectPlaceholder: 'Select an option',
      availability: 'Availability',
      comments: 'Additional comments (optional)',
      policyTitle: 'Data processing policy',
      policyText:
        'This educational demo validates your profile only in this browser. It does not send, store, or share personal data. In a live registration, Nexova’s selection team would use the details to assess your profile and contact you about current or future job opportunities.',
      accept: 'I accept the data policy',
      submit: 'Submit registration',
      clear: 'Clear form',
      noscript: 'Enable JavaScript to validate and simulate your registration.',
      countries: [
        { value: 'spain', label: 'Spain' },
        { value: 'united-states', label: 'United States' },
        { value: 'other', label: 'Other' },
      ],
      sectors: [
        { value: 'technology', label: 'Technology' },
        { value: 'retail', label: 'Retail' },
        { value: 'financial-services', label: 'Financial Services' },
        { value: 'consulting', label: 'Consulting' },
        { value: 'other', label: 'Other' },
      ],
      englishLevels: [
        { value: 'basic', label: 'Basic' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced' },
        { value: 'native', label: 'Native' },
      ],
      availabilities: [
        { value: 'immediate', label: 'Immediate' },
        { value: '1-month', label: '1 month' },
        { value: '2-3-months', label: '2-3 months' },
        { value: 'exploring', label: 'Just exploring' },
      ],
    },
  },
  contact: { eyebrow: 'Let’s connect', heading: 'Great teams start with a conversation.' },
  footer: { rights: 'All rights reserved.', social: 'Social media' },
};

const es: Content = {
  lang: 'es',
  skip: 'Saltar al contenido principal',
  nav: { label: 'Navegación principal', home: 'Inicio', services: 'Servicios', talent: 'Talento', contact: 'Contacto', menu: 'Menú' },
  language: 'Idioma',
  home: {
    title: 'Selección de talento y consultoría de RR. HH.',
    description:
      'Consultoría de recursos humanos y adquisición de talento con más de 10 años ayudando a empresas de tecnología, retail y servicios financieros a encontrar y desarrollar el mejor talento.',
    eyebrow: 'Valencia · Miami / Las personas primero, desde 2011',
    heading: 'Construimos equipos excepcionales para empresas en crecimiento',
    cta: 'Únete a nuestra bolsa de talento',
    stat: {
      value: '120',
      label: 'personas. Un propósito compartido.',
      text: 'Encontrar talento excepcional. Crear equipos de atención fiables. Desarrollar a los líderes del mañana.',
      footnote: 'Desde 2011 · Consultoría de recursos humanos',
    },
    services: {
      eyebrow: 'Nuestra experiencia',
      heading: 'Tres servicios. Equipos más fuertes.',
      items: [
        {
          title: 'Headhunting ejecutivo',
          points: ['Búsqueda y selección de perfiles ejecutivos y mandos intermedios', 'Proceso personalizado con garantía de reemplazo'],
        },
        {
          title: 'Externalización de atención al cliente',
          points: ['Equipos especializados para empresas tecnológicas', 'Formación continua y supervisión dedicada'],
        },
        {
          title: 'Formación corporativa',
          points: ['Programas de habilidades interpersonales y liderazgo', 'Cursos presenciales y online adaptados a cada organización'],
        },
      ],
    },
    why: {
      heading: 'Por qué Nexova',
      intro: 'Conocimiento especializado, trato personal y el alcance necesario para ayudar a tu empresa a crecer.',
      items: [
        { title: '12 años de experiencia', text: 'En el mercado latinoamericano' },
        { title: 'Presencia regional', text: 'España y Estados Unidos' },
        { title: '+500 procesos de selección exitosos', text: 'Completados con atención y conocimiento del sector' },
        { title: 'Especialización sectorial', text: 'Tecnología, retail y finanzas' },
      ],
    },
  },
  talent: {
    title: 'Únete a nuestra bolsa de talento',
    description:
      'Registra tu perfil profesional en Nexova para oportunidades de empleo en tecnología, retail, finanzas y consultoría.',
    eyebrow: 'Tu próxima etapa',
    intro:
      '¿Buscas empleo o estás explorando opciones? Cuéntanos sobre ti para que nuestro equipo de selección pueda encontrar oportunidades actuales y futuras para tu perfil.',
    asideHeading: 'Un lugar para tu potencial',
    asideText: 'Regístrate para optar a puestos en nuestros sectores especializados. Todos los niveles de experiencia son bienvenidos.',
    asideCompany: '¿Eres una empresa que busca talento? Escríbenos a',
    asideDemo: 'Formulario de demostración: el envío es simulado. Tu información no se envía ni se almacena.',
    success: {
      heading: '¡Gracias por tu interés en Nexova!',
      received:
        'Hemos recibido tu información. Nuestro equipo de selección la revisará y te contactará si tu perfil coincide con alguna de nuestras oportunidades actuales o futuras.',
      linkedin: 'Mientras tanto, síguenos en LinkedIn para estar al día de nuestras vacantes y contenido de desarrollo profesional.',
      simulated: 'Envío simulado; no se ha transmitido información.',
    },
    form: {
      errorsHeading: 'Corrige los siguientes campos',
      required: 'Los campos marcados con * son obligatorios.',
      contactLegend: 'Datos de contacto',
      profileLegend: 'Perfil profesional',
      fullName: 'Nombre completo',
      email: 'Correo electrónico',
      phone: 'Teléfono',
      country: 'País de residencia',
      experience: 'Años de experiencia',
      sector: 'Sector de interés',
      english: 'Nivel de inglés',
      linkedin: 'LinkedIn',
      optional: 'opcional',
      selectPlaceholder: 'Selecciona una opción',
      availability: 'Disponibilidad',
      comments: 'Comentarios adicionales (opcional)',
      policyTitle: 'Política de tratamiento de datos',
      policyText:
        'Esta demostración educativa valida tu perfil únicamente en este navegador. No envía, almacena ni comparte datos personales. En un registro real, el equipo de selección de Nexova utilizaría los datos para evaluar tu perfil y contactarte sobre oportunidades laborales actuales o futuras.',
      accept: 'Acepto la política de tratamiento de datos',
      submit: 'Enviar registro',
      clear: 'Limpiar formulario',
      noscript: 'Activa JavaScript para validar y simular tu registro.',
      countries: [
        { value: 'spain', label: 'España' },
        { value: 'united-states', label: 'Estados Unidos' },
        { value: 'other', label: 'Otro' },
      ],
      sectors: [
        { value: 'technology', label: 'Tecnología' },
        { value: 'retail', label: 'Retail' },
        { value: 'financial-services', label: 'Servicios financieros' },
        { value: 'consulting', label: 'Consultoría' },
        { value: 'other', label: 'Otro' },
      ],
      englishLevels: [
        { value: 'basic', label: 'Básico' },
        { value: 'intermediate', label: 'Intermedio' },
        { value: 'advanced', label: 'Avanzado' },
        { value: 'native', label: 'Nativo' },
      ],
      availabilities: [
        { value: 'immediate', label: 'Inmediata' },
        { value: '1-month', label: '1 mes' },
        { value: '2-3-months', label: '2-3 meses' },
        { value: 'exploring', label: 'Solo explorando' },
      ],
    },
  },
  contact: { eyebrow: 'Hablemos', heading: 'Los grandes equipos empiezan con una conversación.' },
  footer: { rights: 'Todos los derechos reservados.', social: 'Redes sociales' },
};

export const content: Record<Locale, Content> = { en, es };

/** Route paths per locale. The Spanish site lives under /es. */
export const paths = {
  en: { home: '/', talent: '/application' },
  es: { home: '/es', talent: '/es/application' },
} as const;

export const SITE_URL = 'https://nexova.com';
export const CONTACT = {
  email: 'contacto@nexova.com',
  valencia: { label: '+34 960 123 456', href: 'tel:+34960123456' },
  miami: { label: '+1 305 555 0191', href: 'tel:+13055550191' },
  linkedin: 'https://linkedin.com/company/nexova',
  instagram: 'https://instagram.com/nexova',
} as const;
