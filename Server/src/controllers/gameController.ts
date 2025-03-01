import { Request, Response } from "express";
import Game from "../models/Game";
import User from "../models/User";
import mongoose from "mongoose";

export const createGame = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!req.body.userId) {
            res.status(500).json({ error: "Failed to create game, try refreshing the page" });
            return;
        }

        const newGame = new Game({
            userId: req.body.userId
        });
        await newGame.save();

        await User.findByIdAndUpdate(
            req.body.userId,
            { $push: { gameHistory: newGame._id } },
            { new: true }
        );

        res.status(201).json({ gameId: newGame._id });
    } catch (error) {
        console.error("Error creating game:", error);
        res.status(500).json({ error: "Failed to create game" });
    }
};

export const getGameById = async (req: Request, res: Response): Promise<void> => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.gameId)) {
            res.status(400).json({ message: "Invalid game ID format" });
            return;
        }

        const game = await Game.findById(req.params.gameId);
        if (!game) {
            res.status(404).json({ message: "Game not found" });
            return;
        }
        res.status(200).json(game);
    } catch (error) {
        console.error("Error retrieving game:", error);
        res.status(500).json({ error: "Error retrieving game" });
    }
};
