import mongoose, { Document } from "mongoose";

interface IUser extends Document {
    userName: string;
    gameHistory: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    gameHistory: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Game'
    }]
});

export default mongoose.model<IUser>("User", UserSchema);
