import upload_logo from '../assets/real_upload.svg'
import './Upload.css'
import React from "react"
import { useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

function Upload() {
    const fileInputRef = React.useRef(null);

    const [operationFinished, setOperationFinished] = useState(false);

    useEffect(() => {
        ipcRenderer.on('uploaded-files', (event, message) => {
            if (message === 'uploaded') {
                setOperationFinished(true);
            }
        });

        return () => {
            ipcRenderer.removeAllListeners('operation-finished');
        };
    }, []);

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            ipcRenderer.send("upload-file", file.path);
        }
    };

    return (
        <>
        {operationFinished ? (
            <>
                <progress className="progress" value={null}>
                </progress>
                <span className="progress-text">Training model</span>
            </>
        ) : (
            <>
                <div className="box" onClick={triggerFileInput}>
                    <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept=".zip"
                    />
                    <img className="upload-logo" alt="Upload logo" src={upload_logo} />
                </div>
                <div className="label">
                    <div className="flexcontainer">
                        <p className="text">
                            <span className="upload-wrapper">Upload Files</span>
                            <br />
                            <span className="span">Upload a zip file of your code and training data</span>
                        </p>
                    </div>
                </div>
            </>
        )}
        </>
    );
}

export default Upload;