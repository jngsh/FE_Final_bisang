import React, { useState, useRef, useCallback } from 'react';
import axios from 'axios';
import './UploadFile.css';
import BASE_URL from '@/utils/globalBaseUrl';

const token = localStorage.getItem("token");

function UploadFile() {
  const [dragging, setDragging] = useState(false);
  const [selectFile, setSelectFile] = useState(null);
  const [dragAndDropFile, setDragAndDropFile] = useState(null);
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('여기에 상품관리 엑셀 파일을 끌어서 놓거나, 파일을 선택하세요.');

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
      setDragAndDropFile(droppedFile);
      setMessage(droppedFile.name);
    } else {
      alert('유효한 엑셀 파일(.xlsx)을 드래그 앤 드롭하세요.');
    }
  }, []);

  const onFileChange = (e) => {
    setSelectFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!dragAndDropFile && !selectFile) {
      alert("먼저 엑셀 파일을 선택하세요");
      return;
    }

    if (!window.confirm("업로드하시겠습니까?")) {
      return;
    }

    const formData = new FormData();
    if (dragAndDropFile) {
      formData.append('file', dragAndDropFile);
    } else if (selectFile) {
      formData.append('file', selectFile);
    }

    try {
      const response = await axios.put(`${BASE_URL}/bisang/admin/products/upload`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*'
        },
      });
      alert(response.data);
    } catch (error) {
      alert("파일 업로드에 실패했습니다. 다시 시도해 주세요.");
      console.error('Error uploading file:', error);
    } finally {
      setSelectFile(null);
      setDragAndDropFile(null);
      setMessage('여기에 상품관리 엑셀 파일을 끌어서 놓거나, 파일을 선택하세요.');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="UploadFile">
      <h4>상품관리 엑셀 파일 업로드</h4>
      <div
        className={`dropzone ${dragging ? 'dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <p>{message}</p>
      </div>
      <input
        type="file"
        accept=".xlsx"
        onChange={onFileChange}
        ref={fileInputRef}
      />
      <button onClick={onUpload}>업로드</button>
      <span>※ 상품관리 파일이 없다면 하단 "상품관리 엑셀 파일 다운로드"에서 다운로드할 수 있습니다.</span>
    </div>
  );
}

export default UploadFile;
