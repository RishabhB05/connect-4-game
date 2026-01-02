import express from 'express';
import { 
  initializeGame, 
  getGameState, 
  makeMove, 
  resetGame 
} from '../controllers/gameController.js';

const router = express.Router();

// Initialize a new game
router.post('/game/init', initializeGame);

// Get current game state
router.get('/game/state', getGameState);

// Make a move
router.post('/game/move', makeMove);

// Reset game
router.post('/game/reset', resetGame);

export default router;
