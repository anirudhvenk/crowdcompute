const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');
require('@electron/remote/main').initialize()
const os = require('os');

const { ipcMain } = require('electron');
const AdmZip = require('adm-zip');
const path = require('path')
const ip = require("ip");

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, onChildAdded } = require("firebase/database");

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
const usersRef = ref(database, 'users')

onChildAdded(usersRef, (snapshot) => {
  const userData = snapshot.val();

  let dockerCreateCommand = `docker create ${userData.docker_username}/${userData.docker_repo}`
  exec(dockerCreateCommand, { cwd: "./" }, (error, stdout ,stderr) => {
    containerID = stdout.replace(/\n/g, '');
    let dockerRunCommand = `docker start ${containerID}`
    exec(dockerRunCommand, { cwd: "./"}, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
      }
      let dockerCopyCommand = `docker cp ${containerID}:/test_model/test.txt ./test.txt`;
      exec(dockerCopyCommand, { cwd: "./" }, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
        }
      });
    });
  });
});

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
  event.sender.send("uploaded-files", "uploaded")

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
  const systemInfo = {
    CPU: {
        cores: os.cpus().length,
        model: os.cpus()[0].model,
        speed: os.cpus()[0].speed,
    },
    GPU: {
        name: 0, // GPU information is more complex and platform-dependent; you may need to use additional libraries or commands to obtain this information
        memory: 0,
    },
    RAM: {
        total: os.totalmem() / 1000000,
        free: os.freemem() / 1000000,
    },
    Disk: {
        total: 0, // Disk information can vary across platforms; you may need to use additional libraries or commands to obtain this information
        free: 0,
    },
    OS: {
        platform: os.platform(),
        release: os.release(),
        architecture: os.arch(),
    },
    Network: {
        latency: 0, // You may need to use additional libraries or commands to obtain network latency information
        bandwidth: 0, // You may need to use additional libraries or commands to obtain network bandwidth information
    },
    Utilization: {
        CPU: os.loadavg()[0] / os.cpus().length * 100, // CPU utilization can be obtained using operating system-specific commands or libraries
        GPU: 0, // GPU utilization can be obtained using operating system-specific commands or libraries
        memory: 0, // Memory utilization can be obtained using operating system-specific commands or libraries
    },
  };

  ipWithDashes = ip.address().replace(/\./g, "-");
  console.log(ipWithDashes)
  writeData('hosts/' + `${ipWithDashes}`, systemInfo)
  availableToHost = true;
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
