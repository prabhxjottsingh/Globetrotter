import express from "express";
import { createGame, getGameById } from "../controllers/gameController";

const router = express.Router();

router.post("/", createGame);
router.get("/:gameId", getGameById);

export default router;
