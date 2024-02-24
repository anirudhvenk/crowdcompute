const { app, BrowserWindow } = require('electron')

require('@electron/remote/main').initialize()

const { ipcMain } = require('electron');
const AdmZip = require('adm-zip');

ipcMain.on('upload-file', (event, filePath) => {
    // Assuming filePath is the path to the zip file
    const zip = new AdmZip(filePath);
    console.log(zip)
    const extractedPath = "./data"; // Define where to extract
    zip.extractAllTo(extractedPath, true);

    const fileContents = zip.getEntries().map(entry => {
        return {
            entryName: entry.entryName,
            content: entry.getData().toString('utf8') // Assuming text files. For binary files, you might handle differently.
        };
    });
    console.log(fileContents)
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // preload: __dirname + 'preload.js',
      contextIsolation: false,
      enableRemoteModule: true,
      nodeIntegration: true
      // preload: __dirname + '/preload.js'
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