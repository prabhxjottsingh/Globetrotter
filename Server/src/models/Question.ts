import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    questionGenerationTimestamp: { type: Date, default: Date.now },
    questionAnsweredTimestamp: { type: Date },
}, { timestamps: true });

export default mongoose.model("Question", QuestionSchema);
