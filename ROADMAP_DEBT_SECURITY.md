# Roadmap, Technical Debt, and Security Risks

This file tracks identified technical debt, potential security vulnerabilities, and recommended functional improvements for the LancerCollab project.

## Security Vulnerabilities & Risks
- [ ] **IDOR Protection:** Systematically verify all controllers (especially in `/client` and `/freelancer` routes) to ensure strict tenant isolation using model scoping (e.g., ensuring requests are constrained by the authenticated user's `account_id` or `client_id`).
- [ ] **Input Sanitization:** Audit all user-provided inputs, specifically `notes` fields and client profile data, for XSS vulnerabilities. Ensure strict Zod validation on the frontend and corresponding Laravel validation rules on the backend.
- [ ] **Magic Token Security:** Review magic token generation for sufficient entropy, verify expiration time configuration, and ensure they are permanently invalidated immediately after use.
- [ ] **Audit Logging:** Ensure all CREATE, UPDATE, DELETE operations on sensitive entities (`Payment`, `Project`) are strictly covered by the `AuditLog` system to maintain an immutable record of actions.

## Technical Debt & Known Bugs
- [ ] **Client Color Inconsistency:** The `projects` table has a `color` column, but the `clients` table does not. This limits UI capabilities where breadcrumbs or cards rely on a `color` attribute for styling.
- [ ] **UI Component Hardcoding:** Several components in `resources/js/components/` contain inline styles or hardcoded Tailwind utility strings that should be abstracted into a theme provider or CSS variables for better maintainability.

## Recommended Functional Enhancements
- [ ] **Client Color Support:** Add a `color` column to the `clients` table to allow per-client visual branding, synchronizing with existing project color support.
- [ ] **Dynamic Breadcrumbs:** Update the breadcrumb component logic to dynamically accept and render a color attribute derived from the current page's entity (Client or Project), enhancing visual hierarchy and context.
- [ ] **Enhanced Dashboard Analytics:** As per the roadmap, implement client engagement scoring and project profitability analysis based on the existing `AuditLog` and `Payment` data.

*Note: This file is a living document intended for project tracking and is not a substitute for a comprehensive security audit.*
