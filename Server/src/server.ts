import dotenv from "dotenv";
import app from "./app";
import connectDB from "./config/db";
dotenv.config();
const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is running on http://localhost:${PORT}`);
});
