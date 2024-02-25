import React from "react";
import "./Host.css";
const { ipcRenderer } = window.require('electron');

export default function Host() {
    const handleClick = () => {
        ipcRenderer.send("submit-host");
    };

    return (
        <div className="submit-box" onClick={handleClick}>
            <span className="span">Submit</span>
        </div>
    )
}