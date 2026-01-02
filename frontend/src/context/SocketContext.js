import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [playerName, setPlayerName] = useState('');
  const [players, setPlayers] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('red');
  const [error, setError] = useState(null);
  const [connected, setConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    const socketUrl = process.env.REACT_APP_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const newSocket = io(socketUrl);

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setConnected(true);
      setError(null);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setConnected(false);
    });

    newSocket.on('player_joined', (data) => {
      setPlayers(data.players);
      setGameState(data.gameState);
      setCurrentPlayer(data.gameState.currentPlayer);
    });

    newSocket.on('move_made', (data) => {
      setGameState({
        ...gameState,
        board: data.board
      });
      setCurrentPlayer(data.currentPlayer);
      setGameOver(data.gameOver);
      if (data.gameOver) {
        setWinner(data.winner);
      }
    });

    newSocket.on('move_error', (data) => {
      setError(data.message);
    });

    newSocket.on('game_reset', (data) => {
      setGameState(data.gameState);
      setCurrentPlayer(data.gameState.currentPlayer);
      setGameOver(false);
      setWinner(null);
      setPlayers(data.players);
    });

    newSocket.on('player_left', (data) => {
      console.log(`Player ${data.playerId} left the room`);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  // Join a room
  const joinRoom = useCallback((newRoomId, name) => {
    if (socket && socket.connected) {
      setRoomId(newRoomId);
      setPlayerName(name);
      socket.emit('join_room', newRoomId, name);
    } else {
      setError('Socket not connected');
    }
  }, [socket]);

  // Make a move
  const makeMove = useCallback((column) => {
    if (socket && roomId) {
      socket.emit('make_move', roomId, column);
    } else {
      setError('Not connected to a room');
    }
  }, [socket, roomId]);

  // Reset game
  const resetGame = useCallback(() => {
    if (socket && roomId) {
      socket.emit('reset_game', roomId);
      setGameOver(false);
      setWinner(null);
    }
  }, [socket, roomId]);

  // Leave room
  const leaveRoom = useCallback(() => {
    if (socket && roomId) {
      socket.emit('leave_room', roomId);
      setRoomId(null);
      setPlayers([]);
      setGameState(null);
      setGameOver(false);
      setWinner(null);
    }
  }, [socket, roomId]);

  const value = {
    socket,
    connected,
    roomId,
    playerName,
    players,
    gameState,
    gameOver,
    winner,
    currentPlayer,
    error,
    joinRoom,
    makeMove,
    resetGame,
    leaveRoom,
    setError
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};
