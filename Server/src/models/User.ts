import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    gameHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: "Game" }],
    userStats: {
        gamePlayed: { type: Number, default: 0 },
        maxScore: { type: Number, default: 0 },
    },
}, { timestamps: true });

export default mongoose.model("User", UserSchema);
