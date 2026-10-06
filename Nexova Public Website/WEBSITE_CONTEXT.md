# Project Brief: Public Company Website

Your company has operated successfully through traditional methods for years, but the world has changed.

Customers now search online for information before making decisions. Competitors already have a digital presence. Despite its experience and quality, your company remains invisible on the internet.

Management has decided to begin the company’s digital transformation. Your task is to build its first digital touchpoint: a professional public website that explains what the company does and captures information from interested people through an application or sign-up form.

The website must:

- [ ] Work correctly on mobile, tablet, and desktop devices.
- [ ] Meet web accessibility standards.
- [ ] Be optimized for search engines.
- [ ] Be optimized for generative engine discovery.
- [ ] Deliver a polished and professional user experience.
- [ ] Represent the first step toward modernizing a company that wants to remain relevant.

> This is not merely a “pretty page.” It is the company’s first step toward establishing a modern digital presence.

# Manager’s Brief

**From:** Your Manager  
**To:** You  
**Subject:** Public Website — First Version

Hi,

As you know, we’ve decided to make the leap to digital. We need to launch our public website as soon as possible.

Read `CONTEXT.md` to understand exactly what our company does and what information we need to collect from interested people.

The website must contain two main parts.

## Landing Page

Create a presentation page containing:

- [ ] A header with clear navigation.
- [ ] A hero section explaining what we do.
- [ ] A clear value proposition explaining why customers should choose us.
- [ ] A section highlighting our main features or key benefits based on our industry experience.
- [ ] Contact information or a clear call to action.
- [ ] A professional footer.

## Application or Sign-Up Form

Create a separate page where visitors can:

- [ ] Enter their personal details.
- [ ] Provide the company-specific information required in `CONTEXT.md`.
- [ ] Submit their application.
- [ ] Receive clear validation feedback before submission.

> The form does not need to connect to a back-end service yet. Submission should be simulated after all data passes validation.

## Technical Requirements

- [ ] Make the website responsive across mobile, tablet, and desktop devices.
- [ ] Use semantic HTML elements.
- [ ] Add ARIA attributes where they improve accessibility.
- [ ] Add descriptive `alt` attributes to every image.
- [ ] Ensure all interactive elements are keyboard accessible.
- [ ] Optimize the website for SEO and GEO.
- [ ] Add Schema.org markup for the company’s information.
- [ ] Implement complete JavaScript validation for every form field.
- [ ] Validate all fields before allowing the form to be submitted.
- [ ] Display clear and specific error messages when entered information is incorrect.
- [ ] Use Tailwind CSS for all styling.
- [ ] Avoid custom handwritten CSS unless it is absolutely necessary.
- [ ] Deliver a professional and visually polished design.

> Make it professional. This is our digital debut, and we want to make a good impression.

Best,  
Your Manager

---

# Implementation Steps

## 1. Review the Project Context

- [ ] Read `CONTEXT.md` completely.
- [ ] Identify the company’s specific information.
- [ ] Identify the exact fields required in the application form.
- [ ] Identify all domain-specific validation rules.
- [ ] Identify any constraints, terminology, entity IDs, or required values.
- [ ] Ensure the implementation matches `CONTEXT.md` exactly.

## 2. Create the Project Structure in WEBSITE_CONTEXT.md

```text
/
├── index.html
├── application.html
├── styles.css
├── validation.js
└── server.py
# Project Brief: Public Company Website

Your company has operated successfully through traditional methods for years, but the world has changed.

Customers now search online for information before making decisions. Competitors already have a digital presence. Despite its experience and quality, your company remains invisible on the internet.

Management has decided to begin the company’s digital transformation. Your task is to build its first digital touchpoint: a professional public website that explains what the company does and captures information from interested people through an application or sign-up form.

The website must:

- [ ] Work correctly on mobile, tablet, and desktop devices.
- [ ] Meet web accessibility standards.
- [ ] Be optimized for search engines.
- [ ] Be optimized for generative engine discovery.
- [ ] Deliver a polished and professional user experience.
- [ ] Represent the first step toward modernizing a company that wants to remain relevant.

> This is not merely a “pretty page.” It is the company’s first step toward establishing a modern digital presence.

# Manager’s Brief

**From:** Your Manager  
**To:** You  
**Subject:** Public Website — First Version

Hi,

As you know, we’ve decided to make the leap to digital. We need to launch our public website as soon as possible.

Read `CONTEXT.md` to understand exactly what our company does and what information we need to collect from interested people.

The website must contain two main parts.

## Landing Page

Create a presentation page containing:

- [ ] A header with clear navigation.
- [ ] A hero section explaining what we do.
- [ ] A clear value proposition explaining why customers should choose us.
- [ ] A section highlighting our main features or key benefits based on our industry experience.
- [ ] Contact information or a clear call to action.
- [ ] A professional footer.

## Application or Sign-Up Form

Create a separate page where visitors can:

- [ ] Enter their personal details.
- [ ] Provide the company-specific information required in `CONTEXT.md`.
- [ ] Submit their application.
- [ ] Receive clear validation feedback before submission.

> The form does not need to connect to a back-end service yet. Submission should be simulated after all data passes validation.

## Technical Requirements

- [ ] Make the website responsive across mobile, tablet, and desktop devices.
- [ ] Use semantic HTML elements.
- [ ] Add ARIA attributes where they improve accessibility.
- [ ] Add descriptive `alt` attributes to every image.
- [ ] Ensure all interactive elements are keyboard accessible.
- [ ] Optimize the website for SEO and GEO.
- [ ] Add Schema.org markup for the company’s information.
- [ ] Implement complete JavaScript validation for every form field.
- [ ] Validate all fields before allowing the form to be submitted.
- [ ] Display clear and specific error messages when entered information is incorrect.
- [ ] Use Tailwind CSS for all styling.
- [ ] Avoid custom handwritten CSS unless it is absolutely necessary.
- [ ] Deliver a professional and visually polished design.

> Make it professional. This is our digital debut, and we want to make a good impression.

Best,  
Your Manager

---

# Implementation Steps

## 1. Review the Project Context

- [ ] Read `CONTEXT.md` completely.
- [ ] Identify the company’s specific information.
- [ ] Identify the exact fields required in the application form.
- [ ] Identify all domain-specific validation rules.
- [ ] Identify any constraints, terminology, entity IDs, or required values.
- [ ] Ensure the implementation matches `CONTEXT.md` exactly.

## 2. Create the Project Structure in WEBSITE_CONTEXT.md

```text
/
├── index.html
├── application.html
├── styles.css
├── validation.js
└── server.py

[ ] Create index.html for the landing page.
[ ] Create application.html for the application or sign-up form.
[ ] Create validation.js for the form-validation logic.
[ ] Create styles.css only if Tailwind CSS cannot provide a required style.
[ ] Create server.py to serve the website locally over HTTP.

## 3. have a http server set up in py so I can open it in the browser 