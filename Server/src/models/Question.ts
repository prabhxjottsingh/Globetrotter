import mongoose, { Document } from "mongoose";

export interface IQuestion extends Document {
    correctCity: string;
    clues: string[];
    options: string[];
    fun_fact: string[];
    trivia: string[];
}

const QuestionSchema = new mongoose.Schema({
    correctCity: { type: String, required: true },
    clues: [{ type: String }],
    options: [{ type: String }],
    fun_fact: [{ type: String }],
    trivia: [{ type: String }]
});

export default mongoose.model<IQuestion>("Question", QuestionSchema);
