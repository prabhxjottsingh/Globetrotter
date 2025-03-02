import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import { useCookies } from "react-cookie";
import Toast from "../components/Toast";

const ChallengeFriend = () => {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [cookie] = useCookies(["userName"]);
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const scoreParam = urlParams.get("score");
    const nameParam = urlParams.get("name");
    if (scoreParam) {
      setScore(parseInt(scoreParam));
    }
    if (nameParam) {
      setName(nameParam);
    }
  }, []);

  const handleAcceptChallenge = () => {
    if (cookie.userName === name) {
      setShowToast(true);
      return;
    }
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      {showToast && (
        <Toast
          message="You cannot accept your own challenge! 😅"
          type="warning"
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="flex-1 gradient-bg flex items-center justify-center p-4">
        <div className="card card-hover max-w-lg w-full text-center animate-slide-up">
          <div className="mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-4">
              You've Been Challenged! 🎮
            </h1>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto rounded-full" />
          </div>

          <div className="space-y-6 mb-8">
            <div className="bg-primary-50 rounded-xl p-6">
              <p className="text-xl text-gray-700 mb-2">
                Your friend <span className="font-bold">{name}</span> scored
              </p>
              <p className="text-4xl font-bold gradient-text">{score} points</p>
            </div>

            <p className="text-lg text-gray-600">
              Think you can beat this score? Accept the challenge and prove your
              knowledge of cities around the world!
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={handleAcceptChallenge}
              className="btn-primary w-full text-lg"
            >
              Accept Challenge 🎯
            </button>
            <p className="text-sm text-gray-500">
              You'll start a new game where you can try to beat this score
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeFriend;
