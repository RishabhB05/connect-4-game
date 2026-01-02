# Connect Four Game - Multiplayer

A real-time multiplayer Connect Four game built with React (frontend) and Node.js/Express (backend) using WebSocket technology.

## Features

Real-time multiplayer gameplay  
Room-based matchmaking  
Red vs Blue color scheme  
Turn-based mechanics with validation  
Win/Draw detection  
Copy room ID for easy sharing  
Responsive design  

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** (comes with Node.js)

## Setup Instructions

### 1. Install Dependencies

**Backend:**

cd backend
npm insall

**Frontend:**
cd frontend
npm install


### 2. Start the Backend Server (Terminal 1)


cd backend
npm start


You should see:

Server is running on http://localhost:5000


### 3. Start the Frontend Server (Terminal 2)

cd frontend
npm start

The app will automatically open at `http://localhost:3000`

## How to Play

1. **Enter your name** in the lobby
2. **Click "Quick Start"** to generate a room ID or **enter a Room ID** to join existing game
3. **Copy the Room ID** (it's displayed at the top) and share with another player
4. **Wait for another player** to join the same room
5. **Red player goes first** - take turns dropping pieces
6. **Get 4 in a row** (horizontal, vertical, or diagonal) to win!
7. Click **"Play Again"** to continue or **"Leave Room"** to exit

