import mongoose, { Document } from "mongoose";

interface IGame extends Document {
    _id: mongoose.Types.ObjectId;
    questionAnswerHistory: {
        questionId: mongoose.Types.ObjectId;
        wasCorrect: boolean;
    }[];
    correctAnswers: number;
    incorrectAnswers: number;
    createdAt: Date;
    updatedAt: Date;
}

const GameSchema = new mongoose.Schema({
    questionAnswerHistory: [{
        _id: false,
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Question" },
        wasCorrect: { type: Boolean }
    }],
    correctAnswers: { type: Number, default: 0 },
    incorrectAnswers: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model<IGame>("Game", GameSchema);
