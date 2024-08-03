import React from 'react';
import DragAndDrop from './DragAndDrop';
import UploadFile from './UploadFile';
import DownloadButton from './DownloadButton';

function StocksPage() {
    return (
        <div className="StocksPage">
            <h4>재고관리 엑셀 파일 업로드</h4>
            <h6>업로드 방법 1. Drag And Drop</h6>
            <DragAndDrop />
            <br />
            <h6>업로드 방법 2. 파일 선택</h6>
            <UploadFile />
            <br />
            <hr />
            <h4>재고관리 엑셀 파일 다운로드</h4>
            <DownloadButton />
        </div>
    );
}

export default StocksPage;
