# Quick Start Guide

## Prerequisites
- Node.js (v14 or higher)
- npm or yarn

## Quick Start

### 1. Install All Dependencies
```bash
npm install && cd backend && npm install && cd ..
```

### 2. Run Backend (Terminal 1)
```bash
cd backend
npm start
```
- Backend will run on: `http://localhost:5000`
- You'll see: "Server is running on http://localhost:5000"

### 3. Run Frontend (Terminal 2)
```bash
npm start
```
- Frontend will open on: `http://localhost:3000`
- The game board will load and connect to the backend

## Testing the Backend

Once the backend is running, test it with:
```bash
curl http://localhost:5000/api/health
```

Should return: `{"status":"Backend is running!"}`

## Making a Move

Call the API to make a move:
```bash
curl -X POST http://localhost:5000/api/game/init
curl -X POST http://localhost:5000/api/game/move -H "Content-Type: application/json" -d "{\"column\": 3}"
```

## Troubleshooting

**Port 5000 already in use:**
- Change PORT in `backend/.env`
- Update `REACT_APP_API_URL` in `.env`
- Update proxy in `package.json`

**CORS errors:**
- Ensure backend is running
- Check `REACT_APP_API_URL` matches the backend URL

**Module not found errors:**
- Run `npm install` in both root and backend directories
- Delete `node_modules` and reinstall if issues persist
