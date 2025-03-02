import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub } from "react-icons/fa";

const NavBar: React.FC = () => {
  const location = useLocation();
  const isInGame = location.pathname.startsWith("/play/");

  const GithubLogo = FaGithub as React.ElementType;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            to="/"
            className={`text-xl font-bold gradient-text transition-all duration-300 ${
              isInGame ? "pointer-events-none opacity-70" : "hover:scale-105"
            }`}
            onClick={(e) => {
              if (isInGame) {
                e.preventDefault();
              }
            }}
          >
            GlobeTrotter
          </Link>

          <a
            href="https://github.com/prabhxjottsingh"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors duration-200"
          >
            <span className="text-sm hidden sm:inline">
              Made by Prabhjot Singh
            </span>
            <GithubLogo className="text-xl" />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
