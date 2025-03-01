import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import questionRoutes from "./routes/questionRoutes";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    const { method, url } = req;

    console.log(`[${new Date().toISOString()}] ${method} ${url} - Started`);

    res.on("finish", () => {
        const duration = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] ${method} ${url} - Completed ${res.statusCode} in ${duration}ms`
        );
    });

    res.on("error", (err) => {
        console.error(
            `[${new Date().toISOString()}] ${method} ${url} - Error: ${err.message}`
        );
    });

    next();
});

app.use("/users", userRoutes);
app.use("/games", gameRoutes);
app.use("/questions", questionRoutes);

export default app;
