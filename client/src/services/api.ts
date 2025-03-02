import axios from "axios";
import { Question, ValidateResponse } from "../types/game";

const API_BASE_URL = "https://globrotter-backend-mdqp0lhkj-prabhxs-projects.vercel.app";

export const createUser = async (userName: string): Promise<string> => {
    const response = await axios.post<{ userId: string }>(`${API_BASE_URL}/users`, { userName });
    return response.data.userId;
};

export const getUserById = async (userId: string) => {
    return await axios.get(`${API_BASE_URL}/users/${userId}`);
};

export const getGameById = async (gameId: string) => {
    return await axios.get(`${API_BASE_URL}/games/${gameId}`);
};

export const getNewQuestion = async (gameId: string): Promise<Question> => {
    const response = await axios.get<Question>(`${API_BASE_URL}/questions/${gameId}/random`);
    return response.data;
};

export const validateSelectedCity = async (gameId: string, questionId: string, selectedCity: string): Promise<ValidateResponse> => {
    const response = await axios.get<boolean>(
        `${API_BASE_URL}/questions/correctCity/${gameId}/${questionId}/${selectedCity}`
    );
    if (response.data === true) {
        return { correct: true, score: 4 };
    }
    return { correct: false, score: 0 };
};

export const createNewGame = async (userId?: string): Promise<string> => {
    const response = await axios.post<{ gameId: string }>(`${API_BASE_URL}/games/`, {
        userId: userId
    });
    return response.data.gameId;
};

