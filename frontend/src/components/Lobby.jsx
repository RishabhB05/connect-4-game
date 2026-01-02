import React, { useState } from 'react';
import { useSocket } from '../context/SocketContext';
import './Lobby.css';

export const Lobby = ({ onGameStart }) => {
  const { joinRoom, connected } = useSocket();
  const [playerName, setPlayerName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [error, setError] = useState('');

  const handleJoinRoom = (e) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    
    if (!roomId.trim()) {
      setError('Please enter a room ID');
      return;
    }

    setError('');
    joinRoom(roomId, playerName);
    onGameStart();
  };

  const handleQuickStart = (e) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }

    setError('');
    const randomRoomId = `room-${Math.random().toString(36).substr(2, 9)}`;
    joinRoom(randomRoomId, playerName);
    onGameStart();
  };

  return (
    <div className="lobby-container">
      <div className="lobby-card">
        <h1>Connect Four Multiplayer</h1>
        
        {!connected && (
          <div className="connection-status connecting">
            Connecting to server...
          </div>
        )}
        
        {connected && (
          <div className="connection-status connected">
            ✓ Connected
          </div>
        )}

        <form onSubmit={handleJoinRoom}>
          <div className="form-group">
            <label htmlFor="playerName">Your Name:</label>
            <input
              id="playerName"
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              disabled={!connected}
              maxLength="20"
            />
          </div>

          <div className="form-group">
            <label htmlFor="roomId">Room ID:</label>
            <input
              id="roomId"
              type="text"
              placeholder="Enter room ID (e.g., game-123)"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              disabled={!connected}
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="button-group">
            <button type="submit" disabled={!connected} className="btn btn-primary">
              Join Room
            </button>
            <button 
              type="button" 
              onClick={handleQuickStart} 
              disabled={!connected}
              className="btn btn-secondary"
            >
              Quick Start
            </button>
          </div>
        </form>

        <div className="instructions">
          <h3>How to Play:</h3>
          <ol>
            <li>Enter your name</li>
            <li>Enter a room ID or use Quick Start to create one</li>
            <li>Wait for another player to join the same room</li>
            <li>Red player goes first</li>
            <li>Take turns dropping pieces to get 4 in a row</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
