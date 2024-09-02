import React from 'react';
import './css/Common.css';

const FileUploader = ({ onFileUpload }) => {

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            const jsonData = JSON.parse(e.target.result);
            onFileUpload(jsonData)
        };

        if (file) {
            reader.readAsText(file);
        }
    };

    return (
        <div>
            <h2 className='leftHeader'>Upload JSON File</h2>
            <input className='leftAlign' type="file" accept=".json" onChange={handleFileUpload} />
        </div>
    );
};

export default FileUploader;
