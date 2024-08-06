import React, { useState, useCallback } from 'react';
import axios from 'axios';
import './DragAndDrop.css';
import BASE_URL from '@/utils/globalBaseUrl';

function DragAndDrop() {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('여기에 상품관리 엑셀 파일을 드래그 앤 드롭하세요.');

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setFile(droppedFile);
      setMessage(droppedFile.name);
    } else {
      setMessage('유효한 엑셀 파일(.xlsx)을 드래그 앤 드롭하세요.');
    }
  }, []);

  const onUpload = async () => {
    if (!file) {
      alert("먼저 엑셀 파일을 드래그 앤 드롭하세요");
      return;
    }
    
    if(!window.confirm("업로드하시겠습니까?")) {
      return;
    }
      
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.put(`${BASE_URL}/bisang/admin/products/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data);
    } catch (error) {
      alert("파일 업로드에 실패했습니다.");
      console.error('Error uploading file:', error);
    } finally {
      setFile(null);
      setMessage('여기에 상품관리 엑셀 파일을 드래그 앤 드롭하세요.');
    }
  };

  return (
    <>
      <div
        className={`dropzone ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>{message}</p>
      </div>
      <button onClick={onUpload}>업로드</button>
      <span>※ 상품관리 파일이 없다면 하단 "상품관리 엑셀 파일 다운로드"에서 다운로드할 수 있습니다.</span>
    </>
  );
}

export default DragAndDrop;
