import { Request, Response } from "express";
import Question, { IQuestion } from "../models/Question";
import Game from "../models/Game";
import mongoose from "mongoose";
import axios from "axios";
import { getQuestionPrompt, cityData } from "../public/prompt";
import dotenv from "dotenv";
import { extractJsonString } from "../../utils/utilities";

dotenv.config();
const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = process.env.GEMINI_API_URL + `?key=${API_KEY}`;

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
        let newQuestion: IQuestion | null = null;
        try {
            const prompt = getQuestionPrompt();
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const generatedQuestion = JSON.parse(extractJsonString(data.candidates[0].content.parts[0].text));

            newQuestion = new Question({
                correctCity: generatedQuestion.correct_city,
                clues: generatedQuestion.clues,
                fun_fact: generatedQuestion.fun_fact,
                trivia: generatedQuestion.trivia,
                options: generatedQuestion.options
            }) as IQuestion;
        } catch (error) {
            const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);

            if (randomQuestion.length > 0) {
                const randomQuestionData = randomQuestion[0];
                newQuestion = new Question({
                    correctCity: randomQuestionData.correctCity,
                    clues: randomQuestionData.clues,
                    fun_fact: randomQuestionData.fun_fact,
                    trivia: randomQuestionData.trivia,
                    options: randomQuestionData.options
                }) as IQuestion;
            } else {
                res.status(500).json({ error: "No questions available" });
                return;
            }
        }
        if (newQuestion) {
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
            return;
        }
        res.status(500).json({ error: "Failed to generate question" });
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

