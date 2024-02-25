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

// const functions = require('firebase-functions');
// const admin = require('firebase-admin');
// admin.initializeApp();

const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set, onChildAdded } = require("firebase/database");
const { getStorage, uploadBytes, listAll, getDownloadURL } = require("firebase/storage");
const sRef = require("firebase/storage").ref;

// const { ref as sRef, getStorage } = require("firebase/storage")

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
const storageRef = sRef(storage)
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

// async function checkAndDownloadNewFiles() {
//   const listRef = storageRef;

//   listAll(listRef).then(async (res) => {
//     res.items.forEach(async (itemRef) => {
//       getDownloadURL(itemRef).then((url) => {
//         console.log(url)
//         return url;
//       })
//     });
//   }).catch((error) => {
//     console.log(error);
//   });
// }

// async function checkAndDownloadNewFiles() {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const listRef = storageRef;
//       const res = await listAll(listRef);
//       const downloadPromises = res.items.map(async (itemRef) => {
//         const url = await getDownloadURL(itemRef);
//         return url; // Assuming you do something with the URL here, like downloading the file
//       });
//       await Promise.all(downloadPromises);
//       resolve(); // Resolve the promise when all downloads are complete
//     } catch (error) {
//       console.log(error);
//       reject(error); // Reject the promise on error
//     }
//   });
// }

// let intervalId = setInterval(() => {
//   checkAndDownloadNewFiles()
//     .then(() => {
//       console.log()
//       clearInterval(intervalId); // Clear the interval once all downloads are complete
//     })
//     .catch((error) => {
//       console.error("Failed to download files:", error);
//       clearInterval(intervalId); // Optionally clear the interval on error as well
//     });
// }, 10000); // Adjust the interval time as needed

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

// setInterval(checkAndDownloadNewFiles, 10)
// console.log(url/)

// async function uploadFile(filePath) {
//   try {
//     // Read the file into memory
//     const fileBuffer = fs.readFileSync(filePath);

//     // Create a Blob from the file buffer
//     const blob = new Blob([fileBuffer], { type: 'text/plain' });

//     // Create a storage reference from our storage service
//     const storageRef = sRef(storage);

//     // Create a reference to 'test.txt'
//     const fileRef = sRef(storage);

//     // Upload the Blob
//     // await fileRef.put(blob);
//     const fileRef = ref(storage, 'test.txt');

//   // Upload the Blob
//     await uploadBytes(fileRef, blob).then((snapshot) => {
//       console.log('File uploaded successfully');
//     });

//     // console.log('File uploaded successfully');
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// }

// Example: Upload 'test.txt' file
// uploadFile('./test.txt');

// storage.put("./test.txt")

// const uploadFile = async (filePath) => {
//   try {
//     // Uploads a local file to the bucket
//     console.log(storage)
//     const [file] = await storage.(filePath, {
//       // Support for HTTP requests made with `Accept-Encoding: gzip`
//       gzip: true,
//       metadata: {
//         // Enable long-lived HTTP caching headers
//         // Use only if the contents of the file will never change
//         // (If the contents will change, use cacheControl: 'no-cache')
//         cacheControl: 'public, max-age=31536000',
//       },
//     });

//     console.log(`${filePath} uploaded to ${bucket.name}`);
//   } catch (error) {
//     console.error('Error uploading file:', error);
//   }
// };

// Example usage
// uploadFile('./file.txt');

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
          });
        });
      });
    });
  }
});

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
