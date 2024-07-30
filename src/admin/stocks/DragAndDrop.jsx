import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './DragAndDrop.css';

function DragAndDrop() {
  const [dragging, setDragging] = useState(false);
  const [message, setMessage] = useState('');

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  };

  const handleDrop = useCallback(async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file || file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      // setMessage('Please upload a valid Excel file (.xlsx)');
      setMessage('엑셀 파일(.xlsx)을 업로드하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8090/bisang/admin/stocks/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage(response.data);
      alert("파일을 업로드했습니다.");
    } catch (error) {
      setMessage('파일 업로드에 실패했습니다.');
      console.error('Error uploading file:', error);
    }
  }, []);

  return (
    <div
      className={`dropzone ${dragging ? 'dragging' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* <p>Drag and drop your Excel file here, or click to select a file</p> */}
      <p>여기에 엑셀 파일을 드래그 앤 드롭하세요.</p>
      <input
        type="file"
        accept=".xlsx"
        style={{ display: 'none' }}
        onChange={(e) => handleDrop({ dataTransfer: { files: e.target.files } })}
      />
      {/* <p>{message}</p> */}
    </div>
  );
}

export default DragAndDrop;
