import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Game from "../components/Game";
import { getGameById } from "../services/api";
import NavBar from "../components/NavBar";

const Play: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [isValidGame, setIsValidGame] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const validateGame = async () => {
      try {
        if (!gameId) {
          navigate("/");
          return;
        }
        await getGameById(gameId);
        setIsValidGame(true);
      } catch (error) {
        setError("Invalid game session");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    };

    validateGame();
  }, [gameId, navigate]);

  if (!isValidGame) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        {error && (
          <div className="flex-1 flex items-center justify-center">
            <div className="error-message max-w-md">{error}</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-1">
        <Game gameId={gameId as string} />
      </div>
    </div>
  );
};

export default Play;
