import express from "express";
import { validateSelectedCity, getQuestionById, getRandomQuestion } from "../controllers/questionController";

const router = express.Router();

router.get("/:gameId/random", getRandomQuestion);
router.get("/correctCity/:gameId/:questionId/:selectedCity", validateSelectedCity);
router.get("/:questionId", getQuestionById);

export default router;
