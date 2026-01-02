import "./App.css";
import { useState } from "react";
import { Board } from "./components/Board";
import { Lobby } from "./components/Lobby";
import { SocketProvider } from "./context/SocketContext";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  const handleLeaveRoom = () => {
    setGameStarted(false);
  };

  return (
    <SocketProvider>
      <div className="app-container">
        {!gameStarted ? (
          <Lobby onGameStart={handleGameStart} />
        ) : (
          <Board onLeaveRoom={handleLeaveRoom} />
        )}
      </div>
    </SocketProvider>
  );
}

export default App;
