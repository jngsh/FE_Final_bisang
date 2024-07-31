import React, { useState } from 'react';
import axios from 'axios';
import './UploadFile.css';

function UploadFile() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onUpload = async () => {
    if (!file) {
      // setMessage('Please select a file first.');
      // setMessage('파일을 먼저 선택하세요.');
      alert("파일을 먼저 선택하세요.");
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
      // setMessage('파일 업로드에 실패했습니다.');
      alert("파일 업로드에 실패했습니다.");
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="UploadFile">
      {/* <h1>Upload Inventory File</h1> */}
      {/* <h4>재고관리 엑셀 파일 업로드</h4> */}
      <input type="file" accept=".xlsx" onChange={onFileChange} />
      <button onClick={onUpload}>업로드</button>
      {/* <p>{message}</p> */}
    </div>
  );
}

export default UploadFile;
