# Connect Four Multiplayer Setup Guide

## Overview

This project now includes full multiplayer support using WebSocket (Socket.io). Two players can connect to the same room and play in real-time.

## Installation

### Backend Dependencies

```bash
cd backend
npm install
```

The following packages are installed:
- `socket.io@^4.5.4` - WebSocket server library

### Frontend Dependencies

```bash
cd ../frontend
npm install
```

The following packages are installed:
- `socket.io-client@^4.5.4` - WebSocket client library

## Running the Application

### Terminal 1 - Backend Server (WebSocket + API)

```bash
cd backend
npm start
```

Expected output:
```
Server is running on http://localhost:5000
```

### Terminal 2 - Frontend Application

```bash
cd frontend
npm start
```

The app will open at `http://localhost:3000`

## How to Play Multiplayer

### Step 1: Start a Game
1. Enter your player name
2. Enter a Room ID (or use Quick Start to generate one)
3. Click "Join Room" or "Quick Start"

### Step 2: Invite Another Player
Share the Room ID with your friend:
- They should enter the same Room ID
- They click "Join Room"
- Once both players are in the room, the game starts

### Step 3: Play
- Red player always goes first
- Click on any column to drop your piece
- You can only make a move when it's your turn
- First to get 4 in a row (horizontal, vertical, or diagonal) wins!

### Step 4: After Game
- Click "Play Again" to reset and continue in the same room
- Click "Leave Room" to exit and return to lobby

## Architecture

### Backend Structure

```
backend/
├── server.js                          # Express + Socket.io server
├── controllers/
│   ├── gameController.js             # REST API for single player
│   └── multiplayerController.js      # Game room management
├── models/
│   └── GameState.js                  # Core game logic
└── routes/
    └── gameRoutes.js                 # REST endpoints
```

### Frontend Structure

```
frontend/src/
├── context/
│   └── SocketContext.js              # WebSocket context & hooks
├── components/
│   ├── Lobby.jsx                     # Room selection screen
│   ├── Lobby.css
│   ├── Board.jsx                     # Multiplayer game board
│   └── Slot.jsx                      # Individual slot component
└── App.js                            # Main app with routing
```

## WebSocket Events

### Client → Server

- `join_room` - Join a game room
  ```javascript
  socket.emit('join_room', roomId, playerName);
  ```

- `make_move` - Make a move
  ```javascript
  socket.emit('make_move', roomId, columnNumber);
  ```

- `reset_game` - Reset the game
  ```javascript
  socket.emit('reset_game', roomId);
  ```

- `leave_room` - Leave the room
  ```javascript
  socket.emit('leave_room', roomId);
  ```

### Server → Client

- `player_joined` - Player joined the room
  ```javascript
  {
    roomId: string,
    players: Player[],
    gameState: GameState
  }
  ```

- `move_made` - A move was made
  ```javascript
  {
    column: number,
    playerId: string,
    board: array,
    currentPlayer: 'red' | 'yellow',
    gameOver: boolean,
    winner: string | null
  }
  ```

- `move_error` - Move was invalid
  ```javascript
  { message: string }
  ```

- `game_reset` - Game was reset
  ```javascript
  {
    gameState: GameState,
    players: Player[]
  }
  ```

- `player_left` - Player left the room
  ```javascript
  {
    roomId: string,
    playerId: string
  }
  ```

## Game Logic

The game uses the `GameState` class which handles:
- Board initialization (6 rows × 7 columns)
- Valid move validation
- Win condition checking (all 4 directions)
- Draw detection
- Player turn management
- Board state management

## Configuration

### Backend (.env)

```
PORT=5000
NODE_ENV=development
```

### Frontend (.env)

```
REACT_APP_API_URL=http://localhost:5000/api
```

The frontend automatically connects to `http://localhost:5000` for WebSocket when using the default configuration.

## Features

✅ Real-time multiplayer
✅ Room-based gameplay
✅ Turn-based mechanics
✅ Win/Draw detection
✅ Player disconnection handling
✅ Responsive UI
✅ Connection status indicator
✅ Error handling

## Troubleshooting

### Connection Issues
- Ensure backend is running on port 5000
- Check browser console for errors
- Verify firewall isn't blocking WebSocket

### Move Not Working
- Check if it's your turn (green indicator)
- Ensure column isn't full
- Verify you're connected to the room

### Two Players Can't Connect
- Use the same Room ID (exact spelling)
- Ensure both are on the same network
- If testing locally, both should be on localhost:3000

### Port Already in Use
Change the PORT in `backend/.env`:
```
PORT=5001
```

And update frontend if needed.

## Future Enhancements

- Game rooms list with spectators
- Chat during gameplay
- Player ratings/statistics
- Replay functionality
- Tournament mode
- AI opponent

## Notes

- Game rooms persist on the server until all players leave
- Server resets all games on restart
- Each room is independent
- Maximum 2 players per room (can be extended)
