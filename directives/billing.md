# Directive: Subscription & Billing

## Goal
Integrate Stripe for subscription management (3 tiers).

## Plans
- **Starter**: 5 Pages
- **Growth**: 10 Pages
- **Pro**: 15 Pages

## Features
- **Dashboard**: Show current plan, next billing date, payment method.
- **Changes**: "Change Plan" modal.
    - **Upgrade**: Calculate proration, charge difference immediately.
    - **Downgrade**: Schedule for end of billing cycle.
- **Portal**: Use Stripe Customer Portal for card updates.

## Integration
- **Sign-up**: Read `?plan=` URL parameter to auto-select tier.
