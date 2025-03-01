import mongoose from "mongoose";

const GameSchema = new mongoose.Schema({
    gameId: { type: String, required: true, unique: true },
    questionAnswerHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question" }],
    correctAnswers: { type: Number, default: 0 },
    incorrectAnswers: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model("Game", GameSchema);
