(() => {
  'use strict';
  const form = document.querySelector('#talent-form');
  if (!form) return;
  const es = form.dataset.locale === 'es';
  const t = (en, spanish) => es ? spanish : en;
  const fields = ['fullName', 'email', 'phone', 'country', 'experience', 'sector', 'english', 'availability', 'linkedin', 'comments', 'dataPolicy'];
  const options = {
    country: ['spain', 'united-states', 'other'],
    sector: ['technology', 'retail', 'financial-services', 'consulting', 'other'],
    english: ['basic', 'intermediate', 'advanced', 'native'],
    availability: ['immediate', '1-month', '2-3-months', 'exploring']
  };
  const errors = {
    fullName: t('Name must contain at least first and last name', 'El nombre debe contener al menos nombre y apellido'),
    email: t('Enter a valid email (example: name@company.com)', 'Introduce un correo válido (ejemplo: nombre@empresa.com)'),
    phone: t('Phone must include country code (example: +34 612 345 678)', 'El teléfono debe incluir el prefijo internacional (ejemplo: +34 612 345 678)'),
    country: t('Select your country of residence', 'Selecciona tu país de residencia'),
    experience: t('Years of experience must be between 0 and 50', 'Los años de experiencia deben estar entre 0 y 50'),
    sector: t('Select your sector of interest', 'Selecciona tu sector de interés'),
    english: t('Indicate your English level', 'Indica tu nivel de inglés'),
    availability: t('Select your availability', 'Selecciona tu disponibilidad'),
    linkedin: t('If you include LinkedIn, it must be a valid URL', 'Si incluyes LinkedIn, debe ser una URL válida'),
    dataPolicy: t('You must accept the data processing policy to continue', 'Debes aceptar la política de tratamiento de datos para continuar')
  };
  const touched = new Set();
  const summary = document.querySelector('#error-summary');
  const list = document.querySelector('#error-list');
  const success = document.querySelector('#success-message');
  const controls = name => [...form.querySelectorAll(`[name="${name}"]`)];
  const value = name => String(form.elements[name].value).trim();

  function validate(name) {
    const current = value(name);
    if (name === 'fullName') {
      const words = current.split(/\s+/u);
      return words.length >= 2 && words.every(word => /\p{L}/u.test(word)) ? '' : errors[name];
    }
    if (name === 'email') return /^[^\s@]+@[^\s@.]+(?:\.[^\s@.]+)+$/.test(current) && !form.elements.email.validity.typeMismatch ? '' : errors[name];
    if (name === 'phone') return /^\+[1-9]\d{0,2}\s\d(?:[\d -]*\d)?$/.test(current) && current.replace(/\D/g, '').length >= 7 && current.replace(/\D/g, '').length <= 15 ? '' : errors[name];
    if (name === 'experience') return current !== '' && Number.isFinite(Number(current)) && Number(current) >= 0 && Number(current) <= 50 ? '' : errors[name];
    if (options[name]) return options[name].includes(current) ? '' : errors[name];
    if (name === 'linkedin') {
      if (!current) return '';
      try {
        const url = new URL(current);
        return /^https?:\/\//i.test(current) && ['http:', 'https:'].includes(url.protocol) ? '' : errors[name];
      } catch { return errors[name]; }
    }
    if (name === 'comments') {
      const remaining = 500 - form.elements.comments.value.length;
      return remaining >= 0 ? '' : t(`Comments cannot exceed 500 characters (${remaining} remaining)`, `Los comentarios no pueden superar los 500 caracteres (${remaining} restantes)`);
    }
    if (name === 'dataPolicy') return form.elements.dataPolicy.checked ? '' : errors[name];
    return '';
  }

  function show(name, message) {
    const error = document.querySelector(`[data-error-for="${name}"]`);
    error.textContent = message;
    error.classList.toggle('hidden', !message);
    controls(name).forEach(control => {
      control.setAttribute('aria-invalid', String(Boolean(message)));
      control.classList.toggle('ring-2', Boolean(message));
      control.classList.toggle('ring-red-600', Boolean(message));
    });
  }
  function updateCount() {
    const used = form.elements.comments.value.length;
    document.querySelector('#comments-count').textContent = t(`${used} / 500 characters (${500 - used} remaining)`, `${used} / 500 caracteres (${500 - used} restantes)`);
  }
  function updateSummary() {
    const invalid = fields.filter(name => touched.has(name) && validate(name));
    list.replaceChildren(...invalid.map(name => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const control = controls(name)[0];
      link.href = `#${control.id}`;
      link.textContent = validate(name);
      link.className = 'underline font-semibold';
      link.addEventListener('click', event => { event.preventDefault(); control.focus(); });
      item.append(link);
      return item;
    }));
    summary.hidden = invalid.length === 0;
    return invalid;
  }
  fields.forEach(name => controls(name).forEach(control => {
    control.addEventListener('blur', () => { touched.add(name); show(name, validate(name)); if (!summary.hidden) updateSummary(); });
    ['input', 'change'].forEach(type => control.addEventListener(type, () => {
      success.hidden = true;
      if (name === 'comments') updateCount();
      if (type === 'change') touched.add(name);
      if (touched.has(name)) show(name, validate(name));
      if (!summary.hidden) updateSummary();
    }));
  }));
  form.addEventListener('submit', event => {
    event.preventDefault();
    success.hidden = true;
    fields.forEach(name => { touched.add(name); show(name, validate(name)); });
    const invalid = updateSummary();
    if (invalid.length) { controls(invalid[0])[0].focus(); return; }
    // Deliberately no request, storage, logging, or backend submission in M1.
    form.reset();
    success.hidden = false;
    success.focus();
  });
  form.addEventListener('reset', () => {
    touched.clear();
    fields.forEach(name => show(name, ''));
    summary.hidden = true;
    list.replaceChildren();
    success.hidden = true;
    // Reset values are restored after the reset event finishes.
    queueMicrotask(updateCount);
  });
  document.querySelector('#clear-form').addEventListener('click', () => form.elements.fullName.focus());
  updateCount();
})();
