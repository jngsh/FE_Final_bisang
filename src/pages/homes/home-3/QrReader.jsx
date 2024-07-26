import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../../assets_scanner/qr-frame.svg";

// axios
import axios from "axios";


const QrReader = () => {
    // QR States
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);

    // Result
    const [scannedResult, setScannedResult] = useState("");

        // Success
        const onScanSuccess = async (result) => {
            console.log("result>>>>>>>>>",result); // Object 형식임
            // console.log(typeof(result));
            
            const qrData = result.data; // data만 qrData에 넣어준다
            setScannedResult(qrData); // ScannedResult에 스캔한 result.data를 넣어준다
            console.log("qrData>>>>>>>>>", qrData); // 얘를 DB에 저장해보자!
        
            let xxxx = {
                data: qrData
            }

            try {
                // API 호출 - 데이터 전송
                const response = await axios.post('http://localhost:8090/bisang/main/qrscan', JSON.stringify(xxxx), {
                    headers: {
                        "Content-Type": `application/json`,
                    },
                });
                console.log('Data sent successfully:', response.data);
    
                // 여기서 필요한 API 응답 데이터 처리를 추가합니다
            } catch (error) {
                console.error('Error sending data:', error);
            }
        };

    // Fail
    const onScanFail = (err) => {
        console.log(err);
    };

    useEffect(() => {
        if (videoEl?.current && !scanner.current) {
            // Instantiate the QR Scanner
            scanner.current = new QrScanner(videoEl?.current, onScanSuccess, {
                onDecodeError: onScanFail,
                // This is the camera facing mode. In mobile devices, "environment" means back camera and "user" means front camera.
                preferredCamera: "environment",
                // This will help us position our "QrFrame.svg" so that user can only scan when qr code is put in between our QrFrame.svg.
                highlightScanRegion: true,
                highlightCodeOutline: true,
                // A custom div which will pair with "highlightScanRegion" option above 👆. This gives us full control over our scan region.
                overlay: qrBoxEl?.current || undefined,
                // 1초당 몇번의 스캔을 할 것인지? ex) 1초에 5번 QR 코드 감지한다
                maxScansPerSecond: 1,
            });

            // Start QR Scanner
            scanner?.current
                ?.start()
                .then(() => setQrOn(true))
                .catch((err) => {
                    if (err) setQrOn(false);
                });
        }

        // Clean up on unmount.
        // This removes the QR Scanner from rendering and using camera when it is closed or removed from the UI.
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    // 브라우저에서 카메라 기능 허용하지 않았으면 alert 띄우기
    useEffect(() => {
        if (!qrOn)
            alert(
                "Camera is blocked or not accessible. Please allow camera in your browser permissions and Reload."
            );
    }, [qrOn]);

    return (
        <div className="qr-reader">
            {/* QR */}
            <video ref={videoEl}></video>
            <div ref={qrBoxEl} className="qr-box">
                <img
                    src={QrFrame}
                    alt="Qr Frame"
                    width={256}
                    height={256}
                    className="qr-frame"
                />
            </div>

            {/* 스캔을 성공하면 scannedResult를 보여준다 */}
            {scannedResult && (
                <p
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 99999,
                        color: "white",
                    }}
                >
                    Scanned Result: {scannedResult}
                </p>
            )}
        </div>
    );
};

export default QrReader;