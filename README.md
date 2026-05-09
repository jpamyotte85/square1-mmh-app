# Square 1 Men's Mental Health App

A mobile application for Square 1 Men's Mental Health (square1mmh.com), available on Android and iOS.

## Features

- **Office Locations** — Map view of all Square 1 office locations
- **AA/NA Groups** — Searchable listings with times and locations
- **Mental Health Directory** — Nearby psychologists and clinics based on your location
- **Message Boards** — Community discussion forums
- **Event Board** — Upcoming events posted by Square 1
- **Job Search** — Listings from Square 1-partnered employers
- **Meet-ups & Hangouts** — Social events and community connections

## Project Structure

```
square1-mmh-app/
├── mobile/          # React Native app (Android + iOS)
├── backend/         # Node.js REST API
├── admin/           # Web admin dashboard
└── .github/         # CI/CD workflows
```

## Tech Stack

| Layer | Technology |
|---|---|
| Mobile | React Native |
| Backend | Node.js + Express |
| Database | PostgreSQL |
| Auth | Firebase Auth |
| Maps | Google Maps SDK |
| Real-time | Firebase Realtime DB |
| Notifications | Firebase Cloud Messaging |
| Hosting | Railway |

## Brand

- **Colors:** `#0171BC` (blue), `#86F44A` (green), `#BC3A23` (red), `#1C1C1C` (dark)
- **Fonts:** Oswald (headings), Inter (body)
- **Tagline:** "We're here for you, brother."

## Funded By

Sponsors and government grants.

## Getting Started

See setup docs in each subfolder:
- [Mobile Setup](./mobile/README.md)
- [Backend Setup](./backend/README.md)
- [Admin Panel Setup](./admin/README.md)
