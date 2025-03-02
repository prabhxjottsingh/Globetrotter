# GlobeTrotter - Geography Learning Game API

GlobeTrotter is an interactive geography learning game that challenges users to identify cities around the world through clues, fun facts, and trivia. This folder contains the backend API built with Node.js, Express, and TypeScript.

## 🌟 Features

- **Dynamic Question Generation**: Uses Google's Gemini AI to generate unique city-based questions
- **User Management**: Create and manage user profiles
- **Game Sessions**: Track individual game sessions and progress
- **Score Tracking**: Monitor correct/incorrect answers and point accumulation
- **Rich City Data**: Includes clues, fun facts, and trivia for various cities
- **Real-time Validation**: Instant feedback on answer submissions

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB
- **AI Integration**: Google Gemini API
- **Deployment**: Vercel
- **Version Control**: Git

## 📁 Project Structure

```
src/
├── config/
│   └── db.ts             # MongoDB connection configuration
├── controllers/
│   ├── gameController.ts # Game session management
│   ├── questionController.ts # Question generation & validation
│   └── userController.ts # User operations
├── models/
│   ├── Game.ts          # Game session schema
│   ├── Question.ts      # Question schema
│   └── User.ts          # User schema
├── public/
│   └── prompt.ts        # Gemini AI prompt templates
├── routes/
│   ├── gameRoutes.ts    # Game endpoints
│   ├── questionRoutes.ts # Question endpoints
│   └── userRoutes.ts    # User endpoints
├── app.ts               # Express app setup & middleware
└── server.ts            # Server initialization

utils/
└── utilities.ts         # Utility functions

config files:
├── .env                 # Environment variables
├── .gitignore          # Git ignore rules
├── package.json        # Project dependencies
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel deployment config
└── vercel.config.js    # Additional Vercel settings
```

## 🚀 API Endpoints

### Users

- `POST /users` - Create a new user
  ```json
  Body: { "userName": "string" }
  Response: { "userId": "string" }
  ```
- `GET /users/:userId` - Get user profile and game history
  ```json
  Response: {
    "userName": "string",
    "gameHistory": ["gameId1", "gameId2"]
  }
  ```

### Games

- `POST /games` - Start a new game session
  ```json
  Body: { "userId": "string" }
  Response: { "gameId": "string" }
  ```
- `GET /games/:gameId` - Get game session details
  ```json
  Response: {
    "questionAnswerHistory": [],
    "correctAnswers": 0,
    "incorrectAnswers": 0
  }
  ```

### Questions

- `GET /questions/:gameId/random` - Get a random city question
  ```json
  Response: {
    "id": "string",
    "clues": ["string"],
    "options": ["string"],
    "fun_fact": ["string"],
    "trivia": ["string"]
  }
  ```
- `GET /questions/correctCity/:gameId/:questionId/:selectedCity` - Validate answer
  ```json
  Response: { "correct": boolean }
  ```

## 🎮 Game Mechanics

### Scoring System

- Correct answer: +4 points
- Incorrect answer: -2 points
- Using a hint: -1 point

### Question Format

Each question includes:

- Multiple choice options for city selection
- Two unique clues about the city
- Two interesting fun facts
- Two historical trivia points

## 🔧 Setup & Installation

1. **Clone the repository**

```
git clone <repository-url>
cd globetrotter-backend
```

2. **Install dependencies**

```
npm install
```

3. **Environment Setup**
   Create a `.env` file with:

```
PORT=8080
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_gemini_api_key
GEMINI_API_URL=your_gemini_api_endpoint
```

4. **Development Mode**

```
npm run dev
```

5. **Production Build**

```
npm run build
```

## 🌐 Deployment

This project is configured for deployment on Vercel:

1. **Install Vercel CLI**

```
npm install -g vercel
```

2. **Deploy**

```
vercel
```

3. **Environment Variables**
   Set up the following in Vercel dashboard:

- `MONGO_URI`
- `GEMINI_API_KEY`
- `GEMINI_API_URL`
