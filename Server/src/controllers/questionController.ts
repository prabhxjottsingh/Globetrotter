import { Request, Response } from "express";
import Question from "../models/Question";

export const createQuestion = async (req: Request, res: Response): Promise<void> => {
    try {
        const newQuestion = new Question(req.body);
        await newQuestion.save();
        res.status(201).json(newQuestion);
    } catch (error) {
        res.status(500).json({ error: "Failed to create question" });
    }
};

export const getQuestionById = async (req: Request, res: Response): Promise<void> => {
    try {
        const question = await Question.findOne({ questionId: req.params.questionId });
        if (!question) res.status(404).json({ message: "Question not found" });
        res.json(question);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving question" });
    }
};
