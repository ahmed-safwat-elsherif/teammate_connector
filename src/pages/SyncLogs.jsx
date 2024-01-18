/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { getLogFiles, getLogs } from '../api/logs';
import '../css/SyncLogs.css';

function saveFile(filename, fileContent) {
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `${filename}.log`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
}

function logFileClick(filename, index) {
    getLogs(index).then(axiosResp => {
        const fileContent = axiosResp.data.data.logs;
        saveFile(filename, fileContent);
    });
}

const SyncLogs = () => {
    const [logFiles, setLogFiles] = useState([]);

    useEffect(() => {
        getLogFiles().then(axiosRes => {
            setLogFiles(axiosRes.data.data.files)
        });
    }, []);

    return (
        logFiles.length > 0
            ? logFiles.map((file, index) => <div key={index} className='log-file-span' onClick={() => logFileClick(file, index)}>{file}</div>)
            : <div>Loading Log Files...</div>
    );
};

export default SyncLogs;
