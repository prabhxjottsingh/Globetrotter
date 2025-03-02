import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";

dotenv.config();

if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, async () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

export default app;
