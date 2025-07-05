// main.js
const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    }
  });

  // Point to your frontend index.html or hosted Vercel URL
  win.loadURL('http://localhost:3000'); // assuming backend serves frontend
}

app.whenReady().then(() => {
  // 🟢 Start your Express server before opening the window
  exec('node server.js', (err, stdout, stderr) => {
    if (err) {
      console.error(`Server error: ${err}`);
      return;
    }
    console.log(`Server started:\n${stdout}`);
    createWindow();
  });
});
