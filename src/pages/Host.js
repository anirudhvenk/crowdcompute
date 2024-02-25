import React ,{ useState } from "react";
import "./host.css";
const { ipcRenderer } = window.require('electron');

export default function Host() {
    const [boxColor, setBoxColor] = useState(''); 
    // Initialize with an empty string or your default color

    const handleClick = () => {
        ipcRenderer.send("submit-host");
        setBoxColor('green');

    };
    

   
    return (
    <div
        className="BG"
        
        onClick={handleClick}
    >

        <div className="submit-box" style={{ backgroundColor: boxColor }} onClick={handleClick}>
            <span className="span">Submit</span>
        </div>
        < p style={{ textAlign: 'center', marginTop: '295px', fontWeight: 'bold' , marginLeft:'176px', fontSize: '20px', top: '100%', left: '100%', marginLeft: '150px'}}>
             Host model training
        </p>
    </div>


    )
}