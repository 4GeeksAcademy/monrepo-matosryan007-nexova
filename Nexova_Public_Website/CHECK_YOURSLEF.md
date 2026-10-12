# What You Need to Do

## Landing Page

- [ ] Create `index.html` using a semantic HTML5 structure.
- [ ] Ensure the project can be run locally with an `npx` command compatible with Codespaces.
- [ ] Implement a `<header>` containing the company logo or name and navigation.
- [ ] Create a hero section that presents the company and its value proposition.
- [ ] Add at least two additional sections, such as:
  - Features
  - Benefits
  - How it works
  - Experience
- [ ] Implement a `<footer>` containing contact information.
- [ ] Include a link or button directing users to the application form.
- [ ] Apply styling with Tailwind CSS utility classes.
- [ ] Make the design responsive across mobile, tablet, and desktop breakpoints.
- [ ] Follow a mobile-first design approach.
- [ ] Add descriptive `alt` text to every image.
- [ ] Use semantic HTML elements such as `<section>`, `<article>`, and `<nav>`.
- [ ] Add appropriate ARIA attributes, such as `aria-label` and `role`.
- [ ] Add Schema.org markup for the company using the `Organization` or `LocalBusiness` type.
- [ ] Expose the site through a public Codespaces URL by setting port visibility to **Public**, allowing external auditing.

## Application and Sign-Up Form

- [ ] Create `application.html` with a well-structured form.
- [ ] Include every field specified in `CONTEXT.md`.
- [ ] Use appropriate input types, such as:
  - `email`
  - `tel`
  - `date`
  - `number`
- [ ] Associate every input with a `<label>` using the `for` attribute.
- [ ] Group related fields with `<fieldset>` and `<legend>` where appropriate.
- [ ] Mark mandatory fields with the `required` attribute.
- [ ] Implement a responsive form layout.
- [ ] Apply Tailwind utility classes for spacing, sizing, and focus states.
- [ ] Add the following form controls:
  - A submit button
  - A secondary button that clears the form
- [ ] Create `validation.js` to validate every form field.
- [ ] Implement real-time validation as users type or when a field loses focus.
- [ ] Display a specific error message for each validation failure.
- [ ] Style validation errors so they are clear and visible.
- [ ] Prevent form submission while validation errors are present.
- [ ] Display a success message after valid submission to simulate a successful application.

> **Important:** Field names, entity IDs, and domain-specific values must exactly match the specifications in `CONTEXT.md`. A generic implementation that ignores this context will not be accepted.

# What We Will Evaluate

## HTML Structure and Semantics

- [ ] Appropriate semantic elements are used instead of unnecessary generic `<div>` elements.
- [ ] Every image has descriptive `alt` text.
- [ ] Every form input is correctly associated with a `<label>`.
- [ ] Schema.org markup is present and correctly implemented.
- [ ] The document structure is logical and hierarchical.

## Responsive Design and Tailwind CSS

- [ ] The site adapts correctly to mobile, tablet, and desktop screens.
- [ ] A documented and working `npx` command is provided for running the project locally in Codespaces.
- [ ] The design follows a mobile-first approach.
- [ ] All styling uses Tailwind CSS utility classes.
- [ ] Tailwind breakpoints such as `sm:`, `md:`, and `lg:` are used appropriately.
- [ ] There is no unnecessary custom CSS.
- [ ] The design is visually coherent and professional.
- [ ] Performance reaches a minimum PageSpeed Insights score of **80**, with a target above **90**.
- [ ] Verify performance using one of the following methods:
  - Run PageSpeed Insights against the public Codespaces URL.
  - If PageSpeed Insights cannot access Codespaces, run Lighthouse from Chrome DevTools or the Lighthouse browser extension against the same preview.
  - [ ] Include a screenshot of the Lighthouse results as evidence.

## Accessibility

- [ ] Every interactive element is keyboard accessible.
- [ ] ARIA attributes are used where they improve accessibility.
- [ ] Color contrast meets minimum accessibility standards.
- [ ] Navigation is logical and predictable.
- [ ] Validation errors are announced appropriately to assistive technologies.

## Form and Validation

- [ ] Every field specified in `CONTEXT.md` is present.
- [ ] Appropriate input types are used.
- [ ] JavaScript validation works correctly for every field.
- [ ] Error messages are specific and helpful rather than generic messages such as “Invalid field.”
- [ ] Incorrect data prevents form submission.
- [ ] Focus, error, and success states are visually distinct.
- [ ] The clear-form button works correctly.

## Context Adherence

- [ ] The landing page accurately represents the company type and industry specified in `CONTEXT.md`.
- [ ] The content communicates the company’s experience and competitive advantages.
- [ ] Form fields exactly match the requirements in `CONTEXT.md`.
- [ ] All domain-specific validation rules are implemented.
- [ ] The tone and content reflect an established company transitioning to digital services.