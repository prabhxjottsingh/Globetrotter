# GlobeTrotter 🌍

A fun and interactive geography quiz game that challenges users to identify cities worldwide through clues, fun facts, and trivia.

## Features

- 🎮 Interactive city guessing game
- 🎯 Score tracking and leaderboards
- 🎨 Modern, responsive UI
- 🤖 AI-powered question generation
- 📱 Mobile-friendly design

## Tech Stack

### Frontend

- React
- TypeScript
- Chakra UI
- Framer Motion

### Backend

- Node.js
- Express
- MongoDB
- Google Gemini AI

## Deployed Link

[GlobeTrotter](https://globetrotter-blond.vercel.app//)

## Getting Started

```bash
git clone https://github.com/yourusername/globetrotter.git
```

2. **Install dependencies**

```bash
# Frontend
cd client
npm install

# Backend
cd server
npm install
```

3. **Set up environment variables**

```bash
# Server (.env)
PORT=8080
MONGO_URI=your_mongodb_uri
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=your_gemini_model_api_endpoint

# Client (src/services/api.ts) 
API_BASE_URL=your_backend_url #currently set to vercel url
```

4. **Run the application**

```bash
# Frontend
cd client
npm start

# Backend
cd server
npm run dev
```

## Game Rules

- Correct answer: +4 points
- Incorrect answer: -2 points
- Using a hint: -1 point
