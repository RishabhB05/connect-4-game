import { GameState } from '../models/GameState.js';

// Store for game rooms
const gameRooms = new Map();

// Initialize or get a game room
export const initializeGameRoom = (roomId, playerId, playerName) => {
  if (!gameRooms.has(roomId)) {
    gameRooms.set(roomId, {
      roomId,
      gameState: new GameState(),
      players: [],
      playerMap: {} // Map socketId to player info
    });
  }

  const room = gameRooms.get(roomId);
  
  // Add player if not already in room
  if (!room.playerMap[playerId]) {
    const playerColor = room.players.length === 0 ? 'red' : 'blue';
    
    room.playerMap[playerId] = {
      id: playerId,
      name: playerName,
      color: playerColor,
      joinedAt: new Date()
    };
    
    room.players.push(room.playerMap[playerId]);
  }

  return room;
};

// Handle a game move
export const handleGameMove = (roomId, playerId, column) => {
  const room = gameRooms.get(roomId);
  
  if (!room) {
    return { success: false, message: 'Room not found' };
  }

  const player = room.playerMap[playerId];
  if (!player) {
    return { success: false, message: 'Player not found in room' };
  }

  // Check if it's the current player's turn
  if (room.gameState.currentPlayer !== player.color) {
    return { success: false, message: 'Not your turn' };
  }

  // Make the move
  const result = room.gameState.makeMove(column);

  if (result.success) {
    return {
      success: true,
      board: room.gameState.board,
      currentPlayer: room.gameState.currentPlayer,
      gameOver: room.gameState.gameOver,
      winner: room.gameState.winner
    };
  }

  return { success: false, message: result.message };
};

// Handle game reset
export const handleResetGame = (roomId) => {
  const room = gameRooms.get(roomId);
  
  if (!room) {
    return null;
  }

  room.gameState.resetGame();
  return room;
};

// Clean up room when empty
export const cleanupRoom = (roomId, playerId) => {
  const room = gameRooms.get(roomId);
  
  if (!room) return;

  // Remove player from room
  if (room.playerMap[playerId]) {
    delete room.playerMap[playerId];
    room.players = room.players.filter(p => p.id !== playerId);
  }

  // Delete room if empty
  if (room.players.length === 0) {
    gameRooms.delete(roomId);
  }
};

// Get room info
export const getRoomInfo = (roomId) => {
  return gameRooms.get(roomId);
};

// Get all active rooms
export const getAllRooms = () => {
  return Array.from(gameRooms.entries()).map(([roomId, room]) => ({
    roomId,
    playerCount: room.players.length,
    gameState: room.gameState.getState(),
    players: room.players
  }));
};
