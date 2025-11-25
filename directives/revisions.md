# Directive: Support Ticket System (Revisions)

## Goal
Build a `TicketSystem` for revision requests to keep email clean.

## Data Model
- **Ticket**: `id`, `title`, `status`, `priority`, `user_id`.
- **TicketComment**: `id`, `ticket_id`, `message`, `is_staff_reply`.

## Statuses
- Open, In Progress, Awaiting Client Info, Completed.

## UX
- **Priority Selection**: Ask "Is this a critical bug or a design tweak?" to auto-set priority.
- **Visuals**: Allow clicking on a visual mockup to "pin" a comment (like Figma) if possible, or simple text input.
