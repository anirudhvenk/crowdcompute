import React from "react";
import "./host.css";

const os = require('os');

export default function Host() {
    // Event listener for the submit button
    // const submitButton = document.getElementById('submit-button');
    // submitButton.addEventListener('click', handleSubmitButtonClick);

    return <h1>Host</h1>
}

// // Function to fetch system data from the backend
// async function fetchSystemData() {
//     try {
//         const response = await fetch('http://localhost:3000/get_system_info');
//         if (!response.ok) {
//             throw new Error('Failed to fetch system data');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error('Error fetching system data:', error);
//         return null;
//     }
// }

// // Function to submit system data to Firebase
// function submitSystemDataToFirebase(systemData) {
//     const firebaseConfig = {
//         apiKey: "YOUR_API_KEY",
//         authDomain: "YOUR_AUTH_DOMAIN",
//         databaseURL: "YOUR_DATABASE_URL",
//         projectId: "YOUR_PROJECT_ID",
//         storageBucket: "YOUR_STORAGE_BUCKET",
//         messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
//         appId: "YOUR_APP_ID",
//     };
//     firebase.initializeApp(firebaseConfig);

//     const database = firebase.database();
//     database.ref('systemInfo').set(systemData);

//     console.log('System data submitted to Firebase:', systemData);
// }

// Function to handle submit button click
async function handleSubmitButtonClick() {
    const systemInfo = {
        CPU: {
            cores: os.cpus().length,
            model: os.cpus()[0].model,
            speed: os.cpus()[0].speed,
        },
        GPU: {
            name: 'N/A', // GPU information is more complex and platform-dependent; you may need to use additional libraries or commands to obtain this information
            memory: 0,
        },
        RAM: {
            total: os.totalmem(),
            free: os.freemem(),
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
            GPU: process.gpuUsage(), // GPU utilization can be obtained using operating system-specific commands or libraries
            memory: 0, // Memory utilization can be obtained using operating system-specific commands or libraries
        },
    };
    // if (systemData) {
    //     submitSystemDataToFirebase(systemData);
    // }
}