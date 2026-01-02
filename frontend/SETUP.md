# Connect Four Game - Full Stack Application

This is a full-stack Connect Four game with a React frontend and Node.js/Express backend.

## Project Structure

```
connect-four-main/
├── public/                 # React public files
├── src/                    # React frontend source
│   ├── components/        # React components (Board, Slot)
│   ├── assets/           # Game assets (images)
│   ├── App.js           # Main React App
│   └── index.js         # React entry point
├── backend/               # Node.js/Express backend
│   ├── controllers/      # Game logic controllers
│   ├── models/          # Game state model
│   ├── routes/          # API routes
│   ├── server.js        # Express server entry point
│   ├── package.json     # Backend dependencies
│   └── .env            # Backend environment variables
├── .env                 # Frontend environment variables
├── package.json         # Frontend package (React)
└── package-root.json    # Root package for concurrent server/client
```

## Setup Instructions

### Option 1: Manual Setup

**Backend Setup:**
```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:5000`

**Frontend Setup (in a new terminal):**
```bash
npm install
npm start
```

Frontend runs on `http://localhost:3000`

### Option 2: Install All Dependencies at Once
```bash
npm install && cd backend && npm install && cd ..
```

### Option 3: Run Both Concurrently (requires concurrently package)
```bash
npm run dev
```

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if backend is running

### Game Operations
- **POST** `/api/game/init` - Initialize a new game
- **GET** `/api/game/state` - Get current game state
- **POST** `/api/game/move` - Make a move
  - Body: `{ "column": 0-6 }`
- **POST** `/api/game/reset` - Reset the game

## Game Rules

- Players take turns dropping pieces into columns
- Pieces fall to the lowest available row
- First player to get 4 pieces in a row (horizontal, vertical, or diagonal) wins
- If the board fills up with no winner, it's a draw

## Frontend Setup

The React frontend communicates with the backend API through the proxy configured in `package.json`:
```json
"proxy": "http://localhost:5000"
```

Environment variable: `REACT_APP_API_URL=http://localhost:5000/api`

## Backend Features

- **Express.js** - Web server framework
- **CORS** - Cross-Origin Resource Sharing for frontend communication
- **Game Logic** - Complete Connect Four game logic with win detection
- **Stateful Game** - Single game instance per server session

## Development

To run in development mode with hot reload:

**Backend:**
```bash
cd backend
npm run dev
```

**Frontend:**
```bash
npm start
```

## Technologies Used

### Frontend
- React 18.2.0
- React DOM
- CSS3

### Backend
- Node.js
- Express.js
- CORS
- dotenv

## Notes

- The backend maintains a single game instance in memory
- For production, consider using a database to persist game states
- Add authentication if needed for multiplayer features
- The game currently runs on localhost; update CORS settings and API URL for production deployment
