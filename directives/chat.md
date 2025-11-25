# Directive: Real-Time Chat Messenger

## Goal
Create a `ChatWidget` component that provides a "direct line" to the agency.

## Features
- **Persistence**: Persist in bottom right or dedicated "Messages" tab.
- **Real-time**: Read receipts, typing indicators.
- **Media**: File attachment support.
- **Notifications**: Email client if message unseen for 1 hour.

## Admin View
- Separate view for SEOJack staff to see list of all client chats and reply.

## Tech
- **Backend**: Firebase Firestore (or Socket.io).
