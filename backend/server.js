import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';
import gameRoutes from './routes/gameRoutes.js';
import { initializeGameRoom, handleGameMove, handleResetGame, cleanupRoom } from './controllers/multiplayerController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', gameRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running!' });
});

// WebSocket Events
io.on('connection', (socket) => {
  console.log(`New user connected: ${socket.id}`);

  // Join a game room
  socket.on('join_room', (roomId, playerName) => {
    socket.join(roomId);
    console.log(`${playerName} joined room ${roomId}`);
    
    const gameRoom = initializeGameRoom(roomId, socket.id, playerName);
    
    // Notify others in the room
    io.to(roomId).emit('player_joined', {
      roomId,
      players: gameRoom.players,
      gameState: gameRoom.gameState
    });
  });

  // Make a move
  socket.on('make_move', (roomId, column) => {
    const result = handleGameMove(roomId, socket.id, column);
    
    if (result.success) {
      io.to(roomId).emit('move_made', {
        column,
        playerId: socket.id,
        board: result.board,
        currentPlayer: result.currentPlayer,
        gameOver: result.gameOver,
        winner: result.winner
      });
    } else {
      socket.emit('move_error', { message: result.message });
    }
  });

  // Reset game
  socket.on('reset_game', (roomId) => {
    const gameRoom = handleResetGame(roomId);
    
    if (gameRoom) {
      io.to(roomId).emit('game_reset', {
        gameState: gameRoom.gameState,
        players: gameRoom.players
      });
    }
  });

  // Leave room
  socket.on('leave_room', (roomId) => {
    socket.leave(roomId);
    cleanupRoom(roomId, socket.id);
    
    io.to(roomId).emit('player_left', {
      roomId,
      playerId: socket.id
    });
    
    console.log(`User ${socket.id} left room ${roomId}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Start server
httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
