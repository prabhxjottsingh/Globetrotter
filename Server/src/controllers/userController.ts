import { Request, Response } from "express";
import User from "../models/User";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const existingUser = await User.findOne({ userName: req.body.userName });
        if (existingUser) {
            res.status(400).json({ error: "User with same name already exists, please choose another name" });
            return;
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json({ userId: newUser._id });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Failed to create user" });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await User.findOne({ userId: req.params.userId });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error retrieving user:", error);
        res.status(500).json({ error: "Error retrieving user" });
    }
};
