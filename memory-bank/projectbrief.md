# Project Brief — Nexova Solutions

> Source of truth: root `BRIEFING.md`. If this file and `BRIEFING.md` disagree, `BRIEFING.md` wins — fix this file.

## Who the client is
Nexova Solutions is a human resources consulting and talent acquisition firm founded in **2011**, headquartered in **Valencia, Spain**, with an expansion office in **Miami, Florida**. **120 employees**, about **$8M** annual revenue. CEO: **Laura Mendoza**.

Three business lines:
1. Executive and mid-management headhunting (core business, Talent Selection Operations).
2. Customer support team outsourcing for technology companies.
3. Corporate training in soft skills and leadership.

Clients are mid-sized companies (technology, retail, financial services) that outsource part or all of their talent management.

## The problem
Nexova has a strong reputation and a 12-year network of candidates and clients, but no infrastructure to scale: manual processes, disconnected tools, no telemetry, and leadership data that is always about a week old. New automated, data-driven competitors are entering the market. The AI Engineering team (us) builds the systems and automations that let Nexova do what it already does well, faster and with less manual effort. **AI is the competitive advantage, not an add-on.**

## Departments, owners and what they need

| Area | Owner | Pain today | What they need |
| --- | --- | --- | --- |
| Talent Selection (core) | Javier Almeida, 40 consultants | Each consultant reads 30–80 CVs per search; no real-time candidate status (clients call); matching by intuition | AI CV scoring/ranking, RAG over candidate DB, candidate portal with live status, communication agent for status emails |
| Corporate Training | Elena Vargas, 12 people | Catalogue is a quarterly PDF; enrolment by Google Form + spreadsheet; zero personalisation | Searchable catalogue + online enrolment, recommendation system, learner portal, training advisory chatbot |
| Customer Support | Roberto Díaz, 30 agents | No knowledge base; 48h average resolution vs 24h committed SLA; no live supervisor view | RAG first-line chatbot resolving 40% of queries, knowledge base with semantic search, real-time dashboard, ticket sentiment analysis |
| Sales & Business Dev | Marcos Ibáñez, 18 people (6 AMs, 12 SDRs) | Manual LinkedIn prospecting; HubSpot updated by only 40% of team; deals lost to missing follow-up | Pipeline dashboard, prospecting sequence automation, inactive-deal alerts, AI proposal-angle agent |
| Marketing & Comms | Carmen Ruiz | 2019 website, slow and not accessible; manual content; conversions not measured | Website redesign with SEO/GEO + schema.org, AI-assisted content pipeline, marketing metrics dashboard |
| Human Resources (internal) | Patricia Solís | Holidays, absences, onboarding by email/spreadsheet; review forms unread; no HR metrics | Internal HR portal, automated onboarding checklists, HR KPI dashboard, HR policy agent |
| Technology | CTO Sergio Molina, 6 people | HubSpot, legacy Zendesk, Google Workspace, 2010s home-built ATS, spreadsheets; no telemetry/logging; manual deploys | Centralised telemetry and logging, data pipeline feeding all dashboards, monitoring + alerts, engineering agent over technical docs |
| Executive | Laura Mendoza | Weekly PDF reports cost each manager 4–8 hours | Unified real-time KPI dashboard, auto weekly report, threshold alerts, natural-language AI assistant |

## Project objectives
- Deliver Nexova's AI-centred platform milestone by milestone (website, domain models, pipeline tracker, then backoffice, services and AI agents).
- Keep every feature traceable to a department need in the table above.
- Respect the headline AI constraints from the briefing: explainable CV rankings, support automation that respects the 24h SLA, semantic search over candidates, training recommendations.

## Domain vocabulary
Candidate, vacancy/search, consultant, client company, placement, CV scoring, ranking, pipeline status and stage, enrolment, ticket, SLA, knowledge base. Use these terms in code and UI copy.
