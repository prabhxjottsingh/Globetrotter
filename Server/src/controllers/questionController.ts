import { Request, Response } from "express";
import Question, { IQuestion } from "../models/Question";
import Game from "../models/Game";
import mongoose from "mongoose";

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const question = await Question.findOne({ questionId: req.params.questionId });
        if (!question) {
            res.status(404).json({ message: "Question not found" });
            return;
        }
        res.status(200).json(question);
    } catch (error) {
        console.error("Error retrieving question:", error);
        res.status(500).json({ error: "Error retrieving question" });
    }
};

export const getRandomQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const { gameId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(gameId)) {
            res.status(400).json({ message: "Invalid game ID format" });
            return;
        }

        const game = await Game.findById(gameId);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }

        const newQuestion = new Question({
            correctCity: "Paris",
            clues: [
                "This city is home to a famous tower that sparkles every night.",
                "Known as the 'City of Love' and a hub for fashion and art.",
            ],
            fun_fact: [
                "The Eiffel Tower was supposed to be dismantled after 20 years but was saved because it was useful for radio transmissions!",
                "Paris has only one stop sign in the entire city—most intersections rely on priority-to-the-right rules.",
            ],
            trivia: [
                "This city is famous for its croissants and macarons. Bon appétit!",
                "Paris was originally a Roman city called Lutetia.",
            ],
            options: ["Paris", "London", "Rome", "Madrid"]
        }) as IQuestion;
        await newQuestion.save();

        await Game.findByIdAndUpdate(
            gameId,
            {
                $push: {
                    questionAnswerHistory: {
                        questionId: newQuestion._id,
                        wasCorrect: false
                    }
                }
            },
            { new: true }
        );

        const formattedQuestion = {
            id: newQuestion._id,
            clues: newQuestion.clues,
            fun_fact: newQuestion.fun_fact,
            trivia: newQuestion.trivia,
            options: newQuestion.options
        };
        res.status(200).json(formattedQuestion);
    } catch (error) {
        console.error("Error generating question:", error);
        res.status(500).json({ error: "Failed to generate question" });
    }
};

export const validateSelectedCity = async (req: Request, res: Response): Promise<void> => {
    const { gameId, questionId, selectedCity } = req.params;

    try {
        const question = await Question.findById(questionId);
        if (!question) {
            res.status(404).json({ message: "Question not found" });
            return;
        }

        const isCorrect = question.correctCity === selectedCity;
        await Game.findByIdAndUpdate(gameId, {
            $push: {
                questionAnswerHistory: {
                    questionId: question._id,
                    wasCorrect: isCorrect
                }
            }
        });
        res.status(200).json(isCorrect);
    } catch (error) {
        console.error("Error validating city:", error);
        res.status(500).json({ error: "Failed to validate city" });
    }
};

