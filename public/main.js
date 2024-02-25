const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');
require('@electron/remote/main').initialize()

const { ipcMain } = require('electron');
const AdmZip = require('adm-zip');
const path = require('path')
const ip = require("ip");

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyBKhM8i6pPW3It-95FsRd9SsxtP4zwKbgI",
  authDomain: "crowdcompute-25b5f.firebaseapp.com",
  databaseURL: "https://crowdcompute-25b5f-default-rtdb.firebaseio.com/",
  projectId: "crowdcompute-25b5f",
  storageBucket: "crowdcompute-25b5f.appspot.com",
  messagingSenderId: "80838752312",
  appId: "1:80838752312:web:7f764415c21020d30b8ecd"
};
const firebaseApp = initializeApp(firebaseConfig);
const database = getDatabase(firebaseApp);

function writeData(path, data) {
  set(ref(database, path), data)
    .then(() => {
      console.log("Data saved successfully!");
    })
    .catch((error) => {
      console.log("Failed to write data:", error);
    });
}

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

    writeData(`users/1`, {docker_username: "anirudhvenk", docker_repo: "runnable_image:1.0", ip_address: `${ip.address()}`})
  });
});

ipcMain.on('submit-host', (event) => {

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