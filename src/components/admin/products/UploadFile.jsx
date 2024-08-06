import React, { useState, useRef } from 'react';
import axios from 'axios';
import './UploadFile.css';
import BASE_URL from '@/utils/globalBaseUrl';

function UploadFile() {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      alert("파일을 먼저 선택하세요.");
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
      alert("파일 업로드에 실패했습니다. 다시 시도해 주세요.");
      console.error('Error uploading file:', error);
    } finally {
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="UploadFile">
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
