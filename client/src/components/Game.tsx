import React, { useState, useEffect } from "react";
import ReactConfetti from "react-confetti";
import { GameState, ValidateResponse } from "../types/game";
import {
  validateSelectedCity,
  getNewQuestion,
  createNewGame,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { FaSmileBeam, FaRegSadTear, FaArrowLeft } from "react-icons/fa";
import FactSlider from "./FactSlider";
import html2canvas from "html2canvas";
import Toast from "./Toast";

interface GameProps {
  gameId: string;
}

const ArrowLeftIcon = FaArrowLeft as React.ElementType;

const generateShareImage = async (score: number) => {
  const element = document.createElement("div");
  element.innerHTML = `
    <div style="width: 600px; height: 315px; padding: 20px; background: linear-gradient(135deg, #6366f1 0%, #7c3aed 100%); color: white; font-family: Inter, sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <h1 style="font-size: 32px; margin-bottom: 16px;">GlobeTrotter Challenge!</h1>
      <p style="font-size: 24px; margin-bottom: 24px;">I scored ${score} points</p>
      <p style="font-size: 20px;">Can you beat my score?</p>
    </div>
  `;
  document.body.appendChild(element);
  const canvas = await html2canvas(element);
  document.body.removeChild(element);
  return canvas.toDataURL("image/png");
};

const Game: React.FC<GameProps> = ({ gameId }) => {
  const navigate = useNavigate();
  const [cookies] = useCookies(["userId", "userName"]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    gameId,
    currentQuestion: null,
    score: 0,
    questionsAnswered: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    hintsUsed: 0,
    gameOver: false,
  });
  const [isSharing, setIsSharing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchNewQuestion();
  }, []);

  const fetchNewQuestion = async () => {
    setIsLoading(true);
    try {
      const question = await getNewQuestion(gameId);
      setGameState((prev) => ({ ...prev, currentQuestion: question }));
    } catch (error) {
      console.error("Error fetching question:", error);
      setToastMessage("Failed to load question. Please try again.");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = async (selectedCity: string) => {
    try {
      const result = (await validateSelectedCity(
        gameId,
        gameState.currentQuestion?.id as string,
        selectedCity
      )) as unknown as ValidateResponse;
      const isAnswerCorrect = result.correct;
      if (isAnswerCorrect) {
        setShowConfetti(true);
      }

      setIsCorrect(isAnswerCorrect);
      setShowFeedback(true);

      setGameState((prev) => ({
        ...prev,
        score: prev.score + (isAnswerCorrect ? 4 : -2),
        questionsAnswered: prev.questionsAnswered + 1,
        correctAnswers: prev.correctAnswers + (isAnswerCorrect ? 1 : 0),
        incorrectAnswers: prev.incorrectAnswers + (isAnswerCorrect ? 0 : 1),
      }));
    } catch (error) {
      console.error("Error validating answer:", error);
    }
  };

  const handleHint = () => {
    setShowHint(true);
    setGameState((prev) => ({
      ...prev,
      score: prev.score - 1,
      hintsUsed: prev.hintsUsed + 1,
    }));
  };

  const handlePlayAgain = async () => {
    try {
      const newGameId = await createNewGame(cookies.userId);
      navigate(`/play/${newGameId}`);
      window.location.reload();
    } catch (error) {
      console.error("Error creating new game:", error);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    if (!gameState.gameOver) {
      fetchNewQuestion();
      setShowHint(false);
    }
  };

  const handleShareChallenge = async () => {
    setIsSharing(true);
    try {
      const shareImage = await generateShareImage(gameState.score);
      const challengeUrl = `${window.location.origin}/challengefriend?score=${gameState.score}&name=${cookies.userName}`;

      const shareData = {
        title: "GlobeTrotter Challenge",
        text: `Can you beat my score of ${gameState.score} points in GlobeTrotter? Try now!`,
        url: challengeUrl,
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        const whatsappText = encodeURIComponent(
          `🌍 I scored ${gameState.score} points in GlobeTrotter! Can you beat my score? Play here: ${challengeUrl}`
        );
        window.open(`https://wa.me/?text=${whatsappText}`, "_blank");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const FeedbackModal = () => {
    if (!showFeedback) return null;

    const SmileIcon = FaSmileBeam as React.ElementType;
    const SadIcon = FaRegSadTear as React.ElementType;

    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-slide-up">
          <div className="flex flex-col items-center gap-4">
            <div className="text-6xl">
              {isCorrect ? (
                <SmileIcon className="text-green-500" />
              ) : (
                <SadIcon className="text-red-500" />
              )}
            </div>
            <h2 className="text-2xl font-bold">
              {isCorrect ? "Correct! 🎉" : "Oops! 😢"}
            </h2>

            <FactSlider
              fun_fact={gameState.currentQuestion?.fun_fact || []}
              trivia={gameState.currentQuestion?.trivia || []}
            />

            <p className="text-lg font-bold">Score: {gameState.score}</p>
            <button
              onClick={isCorrect ? handleNextQuestion : handlePlayAgain}
              className="btn-primary w-full"
            >
              {isCorrect ? "Next Question" : "Play Again"}
            </button>
            <button
              onClick={() =>
                setGameState((prev) => ({ ...prev, gameOver: true }))
              }
              className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 mx-auto block"
            >
              End Game
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (gameState.gameOver) {
    return (
      <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
        <div className="card card-hover max-w-2xl w-full text-center">
          <h1 className="text-4xl font-bold gradient-text mb-8">Game Over!</h1>
          <div className="space-y-4 mb-8">
            <p className="text-2xl">Final Score: {gameState.score}</p>
            <p className="text-lg">
              Correct Answers: {gameState.correctAnswers}
            </p>
            <p className="text-lg">
              Wrong Answers: {gameState.incorrectAnswers}
            </p>
            <p className="text-lg">Hints Used: {gameState.hintsUsed}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={handlePlayAgain} className="btn-primary">
              Play Again
            </button>
            <button
              onClick={handleShareChallenge}
              disabled={isSharing}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              {isSharing ? (
                <>
                  <span className="animate-spin">🔄</span> Sharing...
                </>
              ) : (
                <>🤝 Challenge a Friend</>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gradient-bg min-h-screen p-4 relative">
      {showToast && (
        <Toast
          message={toastMessage}
          type="error"
          onClose={() => setShowToast(false)}
        />
      )}
      {showConfetti && <ReactConfetti recycle={false} />}
      <div className="max-w-4xl mx-auto">
        <div className="card card-hover">
          <h1 className="text-3xl sm:text-4xl font-bold gradient-text text-center mb-8">
            GlobeTrotter Challenge
          </h1>

          <p className="text-2xl font-bold text-primary-600 text-center mb-6">
            Score: {gameState.score}
          </p>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">
                Loading your next challenge...
              </p>
            </div>
          ) : gameState.currentQuestion ? (
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-2xl p-6 shadow-inner-lg">
                <p className="text-xl mb-4">
                  {gameState.currentQuestion.clues[0]}
                </p>
                {showHint && (
                  <p className="text-gray-600 italic bg-primary-50 p-4 rounded-lg border border-primary-100">
                    Hint: {gameState.currentQuestion.clues[1]}
                  </p>
                )}
              </div>

              {!showHint && (
                <button
                  onClick={handleHint}
                  className="btn-secondary mx-auto block"
                >
                  Get Hint (-1 point)
                </button>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gameState.currentQuestion.options.map((city, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(city)}
                    className="btn-primary"
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-600">
              <p>No question available. Please try again.</p>
              <button onClick={fetchNewQuestion} className="btn-primary mt-4">
                Retry
              </button>
            </div>
          )}

          <button
            onClick={() =>
              setGameState((prev) => ({ ...prev, gameOver: true }))
            }
            className="mt-8 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200 mx-auto block"
          >
            End Game
          </button>
        </div>
      </div>
      {showFeedback && <FeedbackModal />}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 text-white text-2xl hover:opacity-80 transition-opacity"
      >
        <ArrowLeftIcon size={18} />
      </button>
    </div>
  );
};

export default Game;
