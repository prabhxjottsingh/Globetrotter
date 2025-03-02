# GlobeTrotter 🌍

GlobeTrotter is an interactive web game that tests your knowledge of cities worldwide through engaging trivia and fun facts.

## Project Overview

A React-based web application that presents users with city-related questions and facts. Players earn points by correctly identifying cities, with options to use hints and challenge friends.

## Tech Stack

**Frontend:**

- React 
- TypeScript
- Tailwind CSS
- React Router 
- React Icons
- React Confetti 
- HTML2Canvas 

**State Management:**

- React Hooks
- React Cookie 

**API Integration:**

- Axios 

## Directory Structure

```
src/
├── components/
│   ├── Game.tsx          # Core game logic
│   ├── FactSlider.tsx    # Displays city facts
│   ├── Toast.tsx         # Notification system
│   ├── NavBar.tsx        # Navigation component
│   └── NameInput.tsx     # User name input
├── pages/
│   ├── Home.tsx
│   └── ChallengeFriend.tsx
├── services/
│   └── api.ts            # API endpoints
├── types/
│   └── game.ts           # TypeScript interfaces
└── styles/               # Global styles
```

## Features

**Game Mechanics:**

- Multiple choice city questions
- Point system (+4 correct, -2 incorrect)
- Hint system (-1 point penalty)
- Progress tracking
- Social sharing capabilities

**UI Elements:**

- Loading states
- Interactive feedback
- Score tracking
- Friend challenge system

## Setup Instructions

1. Install dependencies:

```
npm install
```

2. Start development server:

```
npm start
```

3. Build for production:

```
npm run build
```

## Author

Prabhjot Singh
