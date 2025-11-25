# Directive: UX Guidelines (The SEOJack Standard)

## Core Philosophy
The app must be incredibly user-friendly. No technical jargon. The user should feel like they have a direct line to the agency at all times.
**"The Concierge Experience"**: High-end, handheld, premium.

## 1. The "Handheld" Mandate
- **Never present a blank form.** Always use a Wizard pattern with progress bars.
- **Context is King**: When asking for information (e.g., "Brand Hex Codes"), always provide a "Don't know what this is?" tooltip or a direct chat button.
- **Tone**: Error messages must be helpful, not robotic.
    - *Bad*: "Error 400: Bad Request."
    - *Good*: "We couldn't save that logo. It might be too large! Try a file smaller than 5MB."

## 2. Visual Style
- **Aesthetics**: Ample white space, soft shadows, friendly success messages.
- **Components**: Use `shadcn/ui` for consistency.
- **Layout**: Clean, uncluttered, focused on the current task.

## 3. Communication
- **Chat Access**: The Chat Widget must be accessible from *every single view*.
- **Proactive Help**: If a negative event occurs (Payment Failed, Downgrade), prompt the user to chat immediately.
