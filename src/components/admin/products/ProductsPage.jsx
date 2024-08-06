import React from 'react';
import DownloadButton from "./DownloadButton";
import DragAndDrop from "./DragAndDrop";
import UploadFile from "./UploadFile";

function ProductsPage() {
    return (
        <div className="ProductsPage">
            <h4>상품관리 엑셀 파일 업로드</h4>
            <h6>업로드 방법 1. Drag And Drop</h6>
            <DragAndDrop />
            <br />
            <h6>업로드 방법 2. 파일 선택</h6>
            <UploadFile />
            <br />
            <hr />
            <h4>상품관리 엑셀 파일 다운로드</h4>
            <DownloadButton />
        </div>
    );
}

export default ProductsPage;