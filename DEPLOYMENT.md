# Deployment Guide for Render

## Deploy Entire Project to Render (Single Service)

### Option 1: Using Render Dashboard (Recommended)

1. **Push your code to GitHub**

2. **Go to Render Dashboard**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository

3. **Configure the service:**
   - **Name:** `connect-four-game`
   - **Environment:** `Node`
   - **Build Command:**
     ```bash
     cd frontend && npm install && npm run build && cd ../backend && npm install
     ```
   - **Start Command:**
     ```bash
     cd backend && npm start
     ```

4. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `PORT` = `10000` (or leave empty, Render auto-assigns)

5. **Click "Create Web Service"**

6. Wait for deployment to complete (3-5 minutes)

7. Your app will be live at: `https://your-app-name.onrender.com`

### Option 2: Using render.yaml (Blueprint)

1. **Push code to GitHub** (including the `render.yaml` file)

2. **In Render Dashboard:**
   - Click "New +" → "Blueprint"
   - Connect your repository
   - Render will auto-detect the `render.yaml` file
   - Click "Apply"

### How It Works

- Backend builds and serves the frontend React build files
- Single URL for both frontend and backend
- WebSocket connections work automatically
- No CORS issues since everything runs on same domain

### After Deployment

Your app will be accessible at the Render URL. Both the game interface and API will be served from the same domain.

**Test it:**
- Visit your Render URL to see the lobby
- API health check: `https://your-app.onrender.com/api/health`

### Free Tier Notes

⚠️ **Render Free Tier spins down after inactivity**
- First request after inactivity takes 30-60 seconds
- Consider upgrading to paid tier for always-on service

### Troubleshooting

**Build fails?**
- Check that both `frontend/package.json` and `backend/package.json` exist
- Ensure all dependencies are listed

**App not loading?**
- Check Render logs for errors
- Verify `NODE_ENV=production` is set
- Ensure build completed successfully
