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
        style={{ backgroundColor: boxColor, height: '100px', width: '100px', margin: '20px' }}
        onClick={handleClick}
    >

        <div className="submit-box" style={{ backgroundColor: boxColor }} onClick={handleClick}>
            <span className="span">Submit</span>
        </div>
        < p style={{ textAlign: 'center', marginTop: '500px', fontWeight: 'bold' , marginLeft:'176px', fontSize: '22px'}}>
             Push submit to allow your computer to host model training for new computers
        </p>
    </div>


    )
}