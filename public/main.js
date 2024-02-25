const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process');
require('@electron/remote/main').initialize()
const os = require('os');
const fs = require('fs');

const { ipcMain } = require('electron');
const AdmZip = require('adm-zip');
const path = require('path')
const ip = require("ip");
const axios = require("axios")

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, onChildAdded } = require("firebase/database");
const { getStorage, uploadBytes, listAll, getDownloadURL } = require("firebase/storage");
const sRef = require("firebase/storage").ref;

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
const storage = getStorage(firebaseApp)
const storageRef = sRef(storage, "weights")
const usersRef = ref(database, 'users')
global.availableToHost = false;

async function downloadFile(fileUrl, filename) {
  const response = await axios({
    url: fileUrl,
    method: 'GET',
    responseType: 'stream',
  });
  const writer = fs.createWriteStream(path.resolve(downloadFolderPath, filename));
  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

async function checkAndDownloadNewFiles() {
  const listRef = storageRef;
  try {
    const res = await listAll(listRef);
    const downloadPromises = res.items.map(itemRef => getDownloadURL(itemRef));
    const urls = await Promise.all(downloadPromises);
    return urls; // Returns an array of URLs when all downloads are complete
  } catch (error) {
    console.error(error);
    return []; // Returns an empty array in case of errors
  }
}

onChildAdded(usersRef, (snapshot) => {
  const userData = snapshot.val();

  if (global.availableToHost) {
    let dockerPullCommand = `docker pull ${userData.docker_username}/${userData.docker_repo}`
    exec(dockerPullCommand, { cwd: "./" }, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`)
      }
      let dockerCreateCommand = `docker create ${userData.docker_username}/${userData.docker_repo}`
      console.log(userData)
      exec(dockerCreateCommand, { cwd: "./" }, (error, stdout ,stderr) => {
        if (error) {
          console.error(`exec error: ${error}`)
        }
        containerID = stdout.replace(/\n/g, '');
        let dockerRunCommand = `docker start ${containerID}`
        exec(dockerRunCommand, { cwd: "./"}, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`)
          }
          let dockerCopyCommand = `docker cp ${containerID}:/test_model/test.txt ./data/out.txt`;
          exec(dockerCopyCommand, { cwd: "./" }, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`)
            }
            // const fileInput = document.getElementById('fileInput');
            
            // Check if a file is selected
            // if (fileInput.files.length > 0) {
            // const file = fileInput.files[0]; // Get the first file from the file input
              
              // You can now use the 'file' variable to upload the file to Firebase Storage
            // console.log('Selected file:', file);
            console.log('./data/out.txt')
            uploadFileToFirebaseStorage('./data/out.txt');
            // } else {
              // console.error('No file selected.');
            // }
          });
        });
      });
    });
  }
});


function uploadFileToFirebaseStorage(file) {
  const fileRef = sRef(storage, "weights");
  
  uploadBytes(fileRef, file).then((snapshot) => {
    console.log('Uploaded a blob or file!');
  });
}

// let dockerCreateCommand = `docker create anirudhvenk/runnable_image:1.0`
// exec(dockerCreateCommand, { cwd: "./" }, (error, stdout ,stderr) => {
//   containerID = stdout.replace(/\n/g, '');
//   let dockerRunCommand = `docker start ${containerID}`
//   exec(dockerRunCommand, { cwd: "./"}, (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`)
//     }
//     let dockerCopyCommand = `docker cp ${containerID}:/test_model/test.txt ./test.txt`;
//     exec(dockerCopyCommand, { cwd: "./" }, (error, stdout, stderr) => {
//       console.log("printed!")
//       if (error) {
//         console.error(`exec error: ${error}`)
//       }
//     });
//   });
// });

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

      exec(dockerPushCommand, { cwd: extractedPath }, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        ipWithDashes = ip.address().replace(/\./g, "-");
        writeData(`users/` + `${ipWithDashes}`, {docker_username: "anirudhvenk", docker_repo: "runnable_image:1.0", ip_address: `${ip.address()}`})
        
        function repeatedlyCheckAndDownload() {
            checkAndDownloadNewFiles().then(urls => {
              console.log(urls)
              event.sender.send("downloaded-files", urls[0])
            setTimeout(repeatedlyCheckAndDownload, 10000);
          }).catch(error => {
            console.error("An error occurred:", error);
            setTimeout(repeatedlyCheckAndDownload, 10000);
          });
        }
        
        repeatedlyCheckAndDownload();
      });
    });
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
