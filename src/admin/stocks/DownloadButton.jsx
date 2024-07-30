import React from 'react';

const DownloadButton = () => {

    const downloadFile = async () => {
        try {
            const response = await fetch('http://localhost:8090/bisang/admin/stocks/download', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                }
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = '재고관리.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('There was an error downloading the file:', error);
        }
    };

    return (
        <button onClick={downloadFile}>다운로드</button>
    );
};

export default DownloadButton;
