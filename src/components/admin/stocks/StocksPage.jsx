import React from 'react';
import UploadFile from './UploadFile';
import DownloadFile from './DownloadFile';

function StocksPage() {
    return (
        <div className="StocksPage">
            <UploadFile />
            <hr />
            <DownloadFile />
        </div>
    );
}

export default StocksPage;
