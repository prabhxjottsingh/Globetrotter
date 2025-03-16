import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createNewGame } from "../services/api";
import NameInput from "../components/NameInput";
import { useCookies } from "react-cookie";
import NavBar from "../components/NavBar";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [showNameInput, setShowNameInput] = useState(false);
  const [cookies] = useCookies(["userId", "userName"]);
  const [error, setError] = useState<string | null>(null);
  const [startGameButtonClicked, setStartGameButtonClicked] = useState(false);

  useEffect(() => {
    if (!cookies.userId) {
      setShowNameInput(true);
    }
  }, [cookies.userId]);

  const handleStartGame = async () => {
    try {
      setStartGameButtonClicked(true);
      const gameId = await createNewGame(cookies.userId);
      navigate(`/play/${gameId}`);
    } catch (error) {
      setError("Error starting game");
      setTimeout(() => setError(null), 3000);
    } finally {
      setStartGameButtonClicked(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col">
      <NavBar />
      <div className="flex-grow flex items-center justify-center p-4 sm:p-8 gradient-bg">
        <div
          className="w-full max-w-2xl mx-auto bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 
            transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
        >
          <div className="flex flex-col items-center gap-8">
            <h1
              className="text-3xl sm:text-4xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-500 to-purple-600 text-center"
            >
              Welcome to GlobeTrotter
              {cookies.userName && `, ${cookies.userName}!`}
            </h1>

            <p className="text-lg sm:text-xl text-gray-700 text-center">
              Test your knowledge of cities around the world in this exciting
              quiz game!
            </p>

            <button
              onClick={handleStartGame}
              className={`inline-flex items-center justify-center px-6 sm:px-8 py-3 
                text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md 
                hover:bg-blue-700 transform transition-all duration-300 
                hover:shadow-lg hover:-translate-y-0.5 
                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                ${
                  startGameButtonClicked ? "bg-gray-400 hover:bg-gray-400" : ""
                }`}
            >
              {startGameButtonClicked ? "Starting Game..." : "Start Game"}
            </button>

            {error && (
              <div className="w-full text-center text-red-600 bg-red-100 p-3 rounded-lg">
                {error}
              </div>
            )}
          </div>
        </div>
      </div>

      <NameInput
        isOpen={showNameInput}
        onClose={() => setShowNameInput(false)}
      />
    </div>
  );
};

export default Home;
