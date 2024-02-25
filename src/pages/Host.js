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
    <div className="BG" style={{ background: '#F2EEE3' }}>
        <div className="submit-box" style={{ backgroundColor: boxColor , background:  '#F2EEE3' }} onClick={handleClick}>
            <span className="span">Submit</span>
        </div>
        < p style={{ textAlign: 'center', marginTop: '500px', fontWeight: 'bold' , marginLeft:'176px'}}>
             Push submit to allow your computer to host model training for new computers
        </p>
    </div>


    )
}