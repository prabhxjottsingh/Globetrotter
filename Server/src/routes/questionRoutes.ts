import express from "express";
import { createQuestion, getQuestionById } from "../controllers/questionController";

const router = express.Router();

router.post("/", createQuestion);
router.get("/:questionId", getQuestionById);

export default router;
