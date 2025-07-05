const { app, BrowserWindow } = require('electron');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  });

  win.loadURL('data:text/html,<h1>Hello Electron</h1>');
  console.log("🚀 MAIN FILE IS RUNNING");
}

app.whenReady().then(createWindow);
