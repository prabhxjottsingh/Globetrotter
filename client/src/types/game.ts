export interface Question {
    id: string;
    clues: string[];
    options: string[];
    fun_fact: string[];
    trivia: string[];
}

export interface GameState {
    gameId: string;
    currentQuestion: Question | null;
    score: number;
    questionsAnswered: number;
    correctAnswers: number;
    incorrectAnswers: number;
    hintsUsed: number;
    gameOver: boolean;
}

export interface Game {
    id: string;
    userId?: string;
    questionAnswerHistory: {
        questionId: string;
        wasCorrect: boolean;
    };
    correctAnswers: number;
    incorrectAnswers: number;
    createdAt: string;
    updatedAt: string;
}

export interface ValidateResponse {
    correct: boolean;
    score: number;
} 