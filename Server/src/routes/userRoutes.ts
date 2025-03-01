import express from "express";
import { createUser, getUserById } from "../controllers/userController";


const router = express.Router();

router.post("/", createUser);
router.get("/:userId", getUserById);

export default router;
