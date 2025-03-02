import express, { Request, Response, NextFunction } from "express";
import connectDB from "./config/db";
import userRoutes from "./routes/userRoutes";
import gameRoutes from "./routes/gameRoutes";
import questionRoutes from "./routes/questionRoutes";
import cors from "cors";

const app = express();

// Connect to MongoDB
connectDB().catch(console.error);

// CORS configuration
app.use(cors({
    origin: '*',  // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: false
}));

// Body parser
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

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

app.use("/test", (req: Request, res: Response) => {
    res.json({ message: "Backend is hosted successfully on Vercel" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

export default app;
