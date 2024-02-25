import React ,{ useState } from "react";
import "./host.css";
const { ipcRenderer } = window.require('electron');

export default function Host() {
    const [boxColor, setBoxColor] = useState(''); 
    const [inputValue, setInputValue] = useState('');
    // Initialize with an empty string or your default color

    const handleClick = () => {
        ipcRenderer.send("submit-host");
        setBoxColor('green');

    };
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

   
    return (
        <div>
        <div className="submit-box" style={{ backgroundColor: boxColor }} onClick={handleClick}>
            <span className="span">Submit</span>
        </div>
        <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Push submit to submit your computer as an available host for model training!"
        />
    </div>


    )
}