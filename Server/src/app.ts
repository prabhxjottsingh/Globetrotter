import express from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import questionRoutes from "./routes/questionRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/questions", questionRoutes);

connectDB();

export default app;
