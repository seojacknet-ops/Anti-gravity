# Directive: Client Onboarding Wizard

## Goal
Build a "Handheld" Onboarding Wizard (`ClientOnboardingWizard`) that guides a new user through providing their website details.

## UX Requirements
- **Style**: Multi-step wizard, not a boring form.
- **Progress**: Show a progress bar at the top.
- **Persistence**: Allow "Save & Continue Later".
- **Help**: "Ask SEOJack for Help" button if they get stuck (opens chat).

## Steps
1.  **The Vibe**
    - Inputs: Brand colors, style preferences (modern, classic, bold), example sites.
2.  **The Content**
    - Inputs: Upload logo, write a short "About Us" bio.
3.  **The Goal**
    - Inputs: Primary aim (Leads, Sales, Brand Awareness).

## Execution Notes
- Use `react-hook-form` for state management.
- Persist draft state to DB or LocalStorage.
