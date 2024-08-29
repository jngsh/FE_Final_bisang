import BASE_URL from '@/utils/globalBaseUrl';
import React from 'react';
import './DownloadFile.css';

const token = localStorage.getItem("token");

const DownloadFile = () => {

    const downloadFile = async () => {
        try {
            const response = await fetch(`${BASE_URL}/bisang/admin/products/download`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
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
            a.download = '상품관리.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('There was an error downloading the file:', error);
        }
    };

    return (
        <div className="DownloadFile">
            <h4>상품관리 엑셀 파일 다운로드</h4>
            <button onClick={downloadFile}>다운로드</button>
        </div>
    );
};

export default DownloadFile;
