import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios from "axios";
import { cityData } from "./public/testDataset";
// import { getQuestionPrompt } from "../public/prompt";
import app from "./app";

dotenv.config();
const PORT = process.env.PORT || 8080;


// app.get("/getquestion", async (req: Request, res: Response) => {
//     try {
//         const prompt = getQuestionPrompt(cityData);

//         const response = await axios.post(
//             `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KE}`,
//             {
//                 contents: [{ parts: [{ text: prompt }] }],
//             },
//             {
//                 headers: { "Content-Type": "application/json" },
//             }
//         );

//         res.json(response.data);
//     } catch (error) {
//         console.error("Error fetching from Gemini API:", error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
