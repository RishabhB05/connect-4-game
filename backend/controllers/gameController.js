import { GameState } from '../models/GameState.js';

let gameInstance = null;

export const initializeGame = (req, res) => {
  gameInstance = new GameState();
  res.json({
    success: true,
    message: 'New game initialized',
    state: gameInstance.getState()
  });
};

export const getGameState = (req, res) => {
  if (!gameInstance) {
    gameInstance = new GameState();
  }
  res.json(gameInstance.getState());
};

export const makeMove = (req, res) => {
  if (!gameInstance) {
    gameInstance = new GameState();
  }

  const { column } = req.body;

  if (column === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Column is required'
    });
  }

  const result = gameInstance.makeMove(column);
  res.json({
    ...result,
    state: gameInstance.getState()
  });
};

export const resetGame = (req, res) => {
  if (!gameInstance) {
    gameInstance = new GameState();
  }
  
  gameInstance.resetGame();
  res.json({
    success: true,
    message: 'Game reset',
    state: gameInstance.getState()
  });
};
