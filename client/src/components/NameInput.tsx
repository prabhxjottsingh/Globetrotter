import React, { useState } from "react";
import { createUser } from "../services/api";
import { useCookies } from "react-cookie";

interface NameInputProps {
  isOpen: boolean;
  onClose: () => void;
}

const NameInput: React.FC<NameInputProps> = ({ isOpen, onClose }) => {
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setCookie] = useCookies(["userId", "userName"]);

  const handleSubmit = async () => {
    if (!userName.trim()) {
      setError("Please enter a name");
      return;
    }

    setIsLoading(true);
    try {
      const userId = await createUser(userName.trim());
      const expires = new Date();
      expires.setDate(expires.getDate() + 365);

      setCookie("userId", userId, { expires });
      setCookie("userName", userName.trim(), { expires });
      onClose();
    } catch (error) {
      console.log(error);
      setError(
        ((error as any)?.response?.data?.error as string) ||
          "Error while registering, please try again after some time"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="card w-full max-w-md animate-slide-up">
        <h2 className="text-2xl font-bold gradient-text mb-6">
          Welcome to GlobeTrotter!
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your game name
            </label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Your game name"
              className="input-field"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="btn-primary w-full"
          >
            {isLoading ? "Registering..." : "Register Me"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NameInput;
