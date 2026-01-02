# Connect Four Game - Full Stack Application

A complete Connect Four game built with React (frontend) and Node.js/Express (backend).

## Project Structure

```
connect-four-main/
├── frontend/                   # React frontend
│   ├── public/                # Static files
│   ├── src/                   # React components and styles
│   │   ├── components/        # Board, Slot components
│   │   ├── assets/           # Game assets
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json           # Frontend dependencies
│   ├── .env                   # Frontend env vars
│   └── SETUP.md               # Detailed setup guide
│
├── backend/                    # Node.js/Express backend
│   ├── controllers/           # Game logic handlers
│   ├── models/               # GameState model
│   ├── routes/               # API endpoints
│   ├── server.js             # Express server
│   ├── package.json          # Backend dependencies
│   └── .env                  # Backend env vars
│
├── package-root.json          # Root package (optional)
├── QUICKSTART.md              # Quick start guide
└── SETUP.md                   # Setup guide

```

## Quick Start

### Terminal 1 - Backend (Port 5000)
```bash
cd backend
npm install
npm start
```

### Terminal 2 - Frontend (Port 3000)
```bash
cd frontend
npm install
npm start
```

The frontend will automatically open at `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check
- `POST /api/game/init` - Initialize new game
- `GET /api/game/state` - Get current game state
- `POST /api/game/move` - Make a move (body: `{"column": 0-6}`)
- `POST /api/game/reset` - Reset the game

## Technologies

**Frontend:**
- React 18
- React DOM
- CSS3

**Backend:**
- Node.js
- Express.js
- CORS

## Running Both Servers

You can run both servers simultaneously from different terminals as shown above.

For more detailed setup instructions, see [SETUP.md](SETUP.md) or [QUICKSTART.md](QUICKSTART.md)
