# Connect Four Game - Multiplayer

A real-time multiplayer Connect Four game built with React (frontend) and Node.js/Express (backend) using WebSocket technology.

## Features

✅ Real-time multiplayer gameplay  
✅ Room-based matchmaking  
✅ Red vs Blue color scheme  
✅ Turn-based mechanics with validation  
✅ Win/Draw detection  
✅ Copy room ID for easy sharing  
✅ Responsive design  

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Install Dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd frontend
npm install
```

### 2. Start the Backend Server (Terminal 1)

```bash
cd backend
npm start
```

You should see:
```
Server is running on http://localhost:5000
```

### 3. Start the Frontend Server (Terminal 2)

```bash
cd frontend
npm start
```

The app will automatically open at `http://localhost:3000`

## How to Play

1. **Enter your name** in the lobby
2. **Click "Quick Start"** to generate a room ID or **enter a Room ID** to join existing game
3. **Copy the Room ID** (it's displayed at the top) and share with another player
4. **Wait for another player** to join the same room
5. **Red player goes first** - take turns dropping pieces
6. **Get 4 in a row** (horizontal, vertical, or diagonal) to win!
7. Click **"Play Again"** to continue or **"Leave Room"** to exit

## Project Structure

```
connect-four-main/
├── backend/                    # Node.js/Express server
│   ├── controllers/           # Game logic & room management
│   ├── models/               # GameState class
│   ├── routes/               # API endpoints
│   ├── server.js             # WebSocket & HTTP server
│   ├── package.json          # Backend dependencies
│   └── .env                  # Environment config
│
├── frontend/                  # React application
│   ├── src/
│   │   ├── components/       # Board, Slot, Lobby
│   │   ├── context/          # WebSocket context
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json          # Frontend dependencies
│   └── .env                  # Environment config
└── README.md                 # This file
```

## Technologies Used

**Frontend:**
- React 18
- Socket.io Client
- CSS3

**Backend:**
- Node.js
- Express.js
- Socket.io
- ES Modules

## Game Rules

- **Board:** 6 rows × 7 columns
- **Players:** Red vs Blue
- **Turns:** Players alternate after each move
- **Win Condition:** Get 4 pieces in a row (any direction)
- **Draw:** Board fills with no winner

## Troubleshooting

**"Cannot find module 'socket.io'"**
- Run `npm install` in the backend directory

**"Cannot find module 'socket.io-client'"**
- Run `npm install` in the frontend directory

**"Cannot connect to server"**
- Ensure backend is running (`npm start` in backend folder)
- Check if port 5000 is available
- Restart both frontend and backend servers

**Port 5000 already in use?**
- Edit `backend/.env` and change `PORT=5001`

## Documentation

For more detailed information:
- [SETUP.md](SETUP.md) - Complete setup guide
- [MULTIPLAYER.md](MULTIPLAYER.md) - WebSocket & multiplayer details
- [QUICKSTART.md](QUICKSTART.md) - Quick reference

## License

MIT
