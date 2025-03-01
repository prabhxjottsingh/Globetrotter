import { Request, Response } from "express";
import Game from "../models/Game";

export const createGame = async (req: Request, res: Response): Promise<void> => {
    try {
        const newGame = new Game(req.body);
        await newGame.save();
        res.status(201).json(newGame);
    } catch (error) {
        res.status(500).json({ error: "Failed to create game" });
    }
};

export const getGameById = async (req: Request, res: Response): Promise<void> => {
    try {
        const game = await Game.findOne({ gameId: req.params.gameId });
        if (!game) res.status(404).json({ message: "Game not found" });
        res.json(game);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving game" });
    }
};
