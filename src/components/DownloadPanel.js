import React from 'react';
import { useData } from '../context/DataContext';
import { toast, Toaster } from 'react-hot-toast';
import './css/MainLayout.css';

const DownloadPanel = () => {
    const { jsonData } = useData();

    const handleDownloadCSV = () => {
        toast('Coming Soon', {
            style: {
                background: '#333',
                color: '#fff',  
            },
        });
        /*    
        const fileName = "report.csv";
        const csvRows = [];

        // Add header row
        const headers = Object.keys(jsonData[0]);
        csvRows.push(headers.join(","));

        // Add data rows
        jsonData.forEach(row => {
            const values = headers.map(header => row[header]);
            csvRows.push(values.join(","));
        });

        const csvContent = csvRows.join("\n");
        const blob = new Blob([csvContent], { type: "text/csv" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        */
    };

    const handleDownloadJSON = () => {
        const fileName = "report.json";
        const json = JSON.stringify(jsonData, null, 2);
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = href;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="download-panel">
            <button onClick={handleDownloadCSV}>Download CSV Report</button>
            <button onClick={handleDownloadJSON}>Download JSON Report</button>
            <Toaster position="bottom-center" />
        </div>
    );
};

export default DownloadPanel;
