import React from 'react';
import DownloadFile from "./DownloadFile";
import UploadFile from "./UploadFile";

function ProductsPage() {
    return (
        <div className="ProductsPage">
            <UploadFile />
            <hr />
            <DownloadFile />
        </div>
    );
}

export default ProductsPage;