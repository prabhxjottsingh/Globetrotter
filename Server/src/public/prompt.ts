import { ICity } from "./testDataset";

export const getQuestionPrompt = (cityData: ICity[]): string => {
    return `I will provide a dataset of cities with their clues, fun facts, and trivia. 
I want you to generate a JSON response by picking a random city on Earth that is not in the dataset 
and structure the response in the following format:

{
  "clues": [
    "First clue about the random city",
    "Second clue about the random city"
  ],
  "correct_city": "Correct city name",
  "options": [
    "Correct city name",
    "Incorrect city 1",
    "Incorrect city 2",
    "Incorrect city 3"
  ],
  "fun_fact": [
    "First fun fact about the correct city",
    "Second fun fact about the correct city"
  ],
  "trivia": [
    "First trivia fact about the correct city",
    "Second trivia fact about the correct city"
  ]
}

Ensure the incorrect city options are diverse and not too similar to the correct city.
Keep the facts engaging and accurate.

Here is the dataset of cities that should NOT be used in the response:
${JSON.stringify(cityData, null, 2)}`;
};
