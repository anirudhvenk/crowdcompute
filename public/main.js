const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');
require('@electron/remote/main').initialize()

const { ipcMain } = require('electron');
const AdmZip = require('adm-zip');
const path = require('path')

ipcMain.on('upload-file', (event, filePath) => {
  const zip = new AdmZip(filePath);
  const extractedPath = "./data";
  zip.extractAllTo(extractedPath, true);

  const data_folder = zip.getEntries().map(entry => { return entry.entryName; })[0];
  let dockerBuildCommand = `docker build -t runnable_image:1.0 ${path.join("../", extractedPath, data_folder)}`;
  let dockerTagCommand = `docker tag runnable_image:1.0 anirudhvenk/runnable_image:1.0`;
  let dockerPushCommand = `docker push anirudhvenk/runnable_image:1.0`

  exec(dockerBuildCommand, { cwd: extractedPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }

    exec(dockerTagCommand, { cwd: extractedPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    });

    exec(dockerPushCommand, { cwd: extractedPath }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
    });
  });
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true
    }
  })

  win.loadURL('http://localhost:3000')
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
  
app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})