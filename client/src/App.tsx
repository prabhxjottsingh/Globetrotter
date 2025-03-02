import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import ChallengeFriend from "./pages/ChallengeFriend";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play/:gameId" element={<Play />} />
        <Route path="/challengefriend" element={<ChallengeFriend />} />
      </Routes>
    </Router>
  );
}

export default App;
