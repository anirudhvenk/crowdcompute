/*import React from "react";
import { Filter } from "./Filter";
import { NavItem } from "./NavItem";
import { Setting } from "./Setting";
import { ThreeUser } from "./ThreeUser";
import "./style.css";

export default function Host() {
    return (<div/>)
}

// export default function Host() {
//     return (
//         <div className="hosting">
//             <div className="div-2">
//                 <div className="label">
//                     <div className="text-wrapper">Device Information</div>
//                 </div>
//                 <div className="text-wrapper">Device Information</div>
//                 <div className="overlap-group">
//                     <img className="table" alt="Table" src="table.png" />
//                     <img className="img" alt="Table" src="image.png" />
//                     <div className="text-wrapper-2">CPU</div>
//                     <div className="text-wrapper-3">0</div>
//                 </div>
//                 <div className="overlap">
//                     <div className="rectangle" />
//                     <div className="text-wrapper-4">Submit</div>
//                 </div>
//             </div>
//         </div>
//     );


//     // Event listener for the submit button
//     const submitButton = document.getElementById('submit-button');
//     submitButton.addEventListener('click', handleSubmitButtonClick);

//     return <h1>Host</h1>
// }

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
    const systemData = await fetchSystemData();
    if (systemData) {
        submitSystemDataToFirebase(systemData);
    }
}*/