import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Error retrieving user" });
    }
};
