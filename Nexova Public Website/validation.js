(() => {
  'use strict';

  const form = document.querySelector('#inquiry-form');
  if (!form) return;

  const locale = form.dataset.locale === 'es' ? 'es' : 'en';
  const errorSummary = document.querySelector('#error-summary');
  const errorList = document.querySelector('#error-list');
  const successMessage = document.querySelector('#success-message');
  const clearButton = document.querySelector('#clear-form');
  const summary = form.elements.projectSummary;
  const summaryCount = document.querySelector('#summary-count');
  const phone = form.elements.phone;
  const touched = new Set();

  const allowedValues = {
    companySize: new Set(['1-49', '50-199', '200-499', '500-999', '1000-plus']),
    industry: new Set(['technology', 'retail', 'financial-services', 'other']),
    services: new Set(['talent-selection', 'support-outsourcing', 'corporate-training']),
    timeline: new Set(['immediate', '1-3-months', '3-6-months', 'exploring']),
    preferredContact: new Set(['email', 'phone'])
  };

  const fieldOrder = [
    'firstName',
    'lastName',
    'workEmail',
    'phone',
    'jobTitle',
    'companyName',
    'country',
    'companySize',
    'industry',
    'services',
    'timeline',
    'projectSummary',
    'preferredContact',
    'contactConsent'
  ];

  const copy = {
    en: {
      labels: {
        firstName: 'First name', lastName: 'Last name', workEmail: 'Work email', phone: 'Phone',
        jobTitle: 'Job title', companyName: 'Company name', country: 'Country or region',
        companySize: 'Company size', industry: 'Industry', services: 'Services of interest',
        timeline: 'Desired timeline', projectSummary: 'Project summary',
        preferredContact: 'Contact preference', contactConsent: 'Contact consent'
      },
      required: (label) => `${label} is required.`,
      name: (label) => `${label} must be 2–50 characters and contain letters, spaces, apostrophes, or hyphens only.`,
      email: 'Enter a complete work email address, such as name@company.com.',
      phoneRequired: 'Enter a phone number because phone is your preferred contact method.',
      phone: 'Enter an international phone number containing 7–15 digits.',
      length: (label, min, max) => `${label} must be between ${min} and ${max} characters.`,
      select: (label) => `Select a valid ${label.toLowerCase()}.`,
      services: 'Select at least one Nexova service.',
      summary: 'Describe your project in at least 30 characters (maximum 1,000).',
      consent: 'Confirm that Nexova may contact you about this inquiry.'
    },
    es: {
      labels: {
        firstName: 'Nombre', lastName: 'Apellidos', workEmail: 'Correo profesional', phone: 'Teléfono',
        jobTitle: 'Cargo', companyName: 'Nombre de la empresa', country: 'País o región',
        companySize: 'Tamaño de la empresa', industry: 'Sector', services: 'Servicios de interés',
        timeline: 'Plazo deseado', projectSummary: 'Resumen del proyecto',
        preferredContact: 'Preferencia de contacto', contactConsent: 'Consentimiento de contacto'
      },
      required: (label) => `${label} es obligatorio.`,
      name: (label) => `${label} debe tener entre 2 y 50 caracteres y contener solo letras, espacios, apóstrofes o guiones.`,
      email: 'Introduce un correo profesional completo, por ejemplo nombre@empresa.com.',
      phoneRequired: 'Introduce un teléfono porque has elegido este medio de contacto.',
      phone: 'Introduce un teléfono internacional que contenga entre 7 y 15 dígitos.',
      length: (label, min, max) => `${label} debe tener entre ${min} y ${max} caracteres.`,
      select: (label) => `Selecciona un valor válido para ${label.toLowerCase()}.`,
      services: 'Selecciona al menos un servicio de Nexova.',
      summary: 'Describe el proyecto con al menos 30 caracteres (máximo 1.000).',
      consent: 'Confirma que Nexova puede contactarte acerca de esta consulta.'
    }
  }[locale];

  const namePattern = /^[\p{L}\p{M}][\p{L}\p{M}'’\- ]{1,49}$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phonePattern = /^[+()\d\s.\-]+$/;

  const value = (fieldName) => String(form.elements[fieldName]?.value ?? '').trim();
  const preferredContact = () => form.querySelector('input[name="preferredContact"]:checked')?.value ?? '';
  const selectedServices = () => [...form.querySelectorAll('input[name="services[]"]:checked')].map((control) => control.value);

  function getControls(fieldName) {
    if (fieldName === 'services') return [...form.querySelectorAll('input[name="services[]"]')];
    if (fieldName === 'preferredContact') return [...form.querySelectorAll('input[name="preferredContact"]')];
    const item = form.elements[fieldName];
    if (!item) return [];
    if (typeof RadioNodeList !== 'undefined' && item instanceof RadioNodeList) return [...item];
    return [item];
  }

  function validateField(fieldName) {
    const label = copy.labels[fieldName];

    if (fieldName === 'firstName' || fieldName === 'lastName') {
      const current = value(fieldName);
      if (!current) return copy.required(label);
      return namePattern.test(current) ? '' : copy.name(label);
    }

    if (fieldName === 'workEmail') {
      const current = value(fieldName);
      if (!current) return copy.required(label);
      return current.length <= 254 && emailPattern.test(current) ? '' : copy.email;
    }

    if (fieldName === 'phone') {
      const current = value(fieldName);
      if (!current && preferredContact() === 'phone') return copy.phoneRequired;
      if (!current) return '';
      const digitCount = (current.match(/\d/g) || []).length;
      return phonePattern.test(current) && digitCount >= 7 && digitCount <= 15 ? '' : copy.phone;
    }

    if (fieldName === 'jobTitle') {
      const current = value(fieldName);
      if (!current) return copy.required(label);
      return current.length >= 2 && current.length <= 100 ? '' : copy.length(label, 2, 100);
    }

    if (fieldName === 'companyName') {
      const current = value(fieldName);
      if (!current) return copy.required(label);
      return current.length >= 2 && current.length <= 120 ? '' : copy.length(label, 2, 120);
    }

    if (fieldName === 'country') {
      const current = value(fieldName);
      if (!current) return copy.required(label);
      return current.length >= 2 && current.length <= 80 ? '' : copy.length(label, 2, 80);
    }

    if (fieldName === 'companySize' || fieldName === 'industry' || fieldName === 'timeline') {
      const current = value(fieldName);
      if (!current) return copy.required(label);
      return allowedValues[fieldName].has(current) ? '' : copy.select(label);
    }

    if (fieldName === 'services') {
      const selected = selectedServices();
      return selected.length > 0 && selected.every((item) => allowedValues.services.has(item)) ? '' : copy.services;
    }

    if (fieldName === 'projectSummary') {
      const current = value(fieldName);
      return current.length >= 30 && current.length <= 1000 ? '' : copy.summary;
    }

    if (fieldName === 'preferredContact') {
      const current = preferredContact();
      if (!current) return copy.required(label);
      return allowedValues.preferredContact.has(current) ? '' : copy.select(label);
    }

    if (fieldName === 'contactConsent') {
      return form.elements.contactConsent.checked ? '' : copy.consent;
    }

    return '';
  }

  function setControlState(control, message) {
    const isChoice = control.type === 'checkbox' || control.type === 'radio';
    control.setAttribute('aria-invalid', message ? 'true' : 'false');

    if (isChoice) {
      control.classList.toggle('ring-2', Boolean(message));
      control.classList.toggle('ring-rose-500', Boolean(message));
      return;
    }

    control.classList.toggle('border-rose-500', Boolean(message));
    control.classList.toggle('bg-rose-50', Boolean(message));
    control.classList.toggle('border-slate-300', !message);
  }

  function showFieldState(fieldName, message) {
    const error = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (error) {
      error.textContent = message;
      error.classList.toggle('hidden', !message);
    }
    getControls(fieldName).forEach((control) => setControlState(control, message));
  }

  function validateAndShow(fieldName) {
    const message = validateField(fieldName);
    showFieldState(fieldName, message);
    return message;
  }

  function keyForControl(control) {
    return control.name === 'services[]' ? 'services' : control.name;
  }

  function updateSummaryCount() {
    if (summaryCount && summary) summaryCount.textContent = `${summary.value.length} / 1000`;
  }

  function hideMessages() {
    errorSummary.classList.add('hidden');
    errorList.replaceChildren();
    successMessage.classList.add('hidden');
  }

  function resetValidation() {
    fieldOrder.forEach((fieldName) => showFieldState(fieldName, ''));
    touched.clear();
    hideMessages();
    phone.required = false;
    updateSummaryCount();
  }

  [...form.elements].forEach((control) => {
    if (!control.name) return;
    const fieldName = keyForControl(control);

    control.addEventListener('blur', () => {
      touched.add(fieldName);
      validateAndShow(fieldName);
    });

    control.addEventListener('input', () => {
      if (fieldName === 'projectSummary') updateSummaryCount();
      if (touched.has(fieldName)) validateAndShow(fieldName);
    });

    control.addEventListener('change', () => {
      touched.add(fieldName);
      validateAndShow(fieldName);

      if (fieldName === 'preferredContact') {
        phone.required = preferredContact() === 'phone';
        if (touched.has('phone')) validateAndShow('phone');
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    successMessage.classList.add('hidden');

    const errors = [];
    fieldOrder.forEach((fieldName) => {
      touched.add(fieldName);
      const message = validateAndShow(fieldName);
      if (message) errors.push({fieldName, message});
    });

    if (errors.length > 0) {
      errorList.replaceChildren(...errors.map(({fieldName, message}) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        const target = getControls(fieldName)[0];
        link.href = target?.id ? `#${target.id}` : '#inquiry-form';
        link.className = 'font-semibold underline decoration-rose-400 underline-offset-2 hover:text-rose-700';
        link.textContent = `${copy.labels[fieldName]}: ${message}`;
        item.append(link);
        return item;
      }));
      errorSummary.classList.remove('hidden');
      const firstInvalidControl = getControls(errors[0].fieldName)[0];
      firstInvalidControl?.focus();
      return;
    }

    errorSummary.classList.add('hidden');
    errorList.replaceChildren();
    form.reset();
    fieldOrder.forEach((fieldName) => showFieldState(fieldName, ''));
    touched.clear();
    phone.required = false;
    updateSummaryCount();
    successMessage.classList.remove('hidden');
    successMessage.focus();
  });

  clearButton.addEventListener('click', () => {
    form.reset();
    resetValidation();
    form.elements.firstName.focus();
  });

  updateSummaryCount();
})();
