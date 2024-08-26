import { useEffect, useRef, useState } from "react";

// Styles
import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "../../../assets_scanner/qr-frame.svg";

// axios
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Header1 from "@/components/headers/Header1";


const QrReader = () => {

    const BASE_URL = import.meta.env.VITE_BASE_URL;

    // QR States
    const scanner = useRef();
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);

    // Result
    const [scannedResult, setScannedResult] = useState("");
    const navigate = useNavigate();

    // Success
    const onScanSuccess = async (result) => {
        console.log("result>>>", result); // Object 형식이라네요,,
        // console.log(typeof(result));

        const qrData = result.data; // data만 qrData에 넣어준다
        setScannedResult(qrData); // ScannedResult에 스캔한 result.data를 넣어준다
        console.log("qrData>>>", qrData); // 얘를 DB에 저장해보자!
        console.log("{qrData}>>>", { qrData });

        navigate(`/bisang/products/${qrData}`);
        console.log("스캔 후 자동으로 이동할 링크 : ", `/bisang/products/${qrData}`);

        // // QR Scan 후 스캔 데이터를 DB에 저장할 경우 사용되는 코드
        // // 데이터를 JSON 형식으로 저장해준다
        // let xxxx = {
        //     data: qrData
        // }

        // try {
        //     // API 호출 - 데이터 전송 (Spring Boot랑 연동)
        //     const response = await axios.post(`${BASE_URL}/bisang/main/qrscan`, JSON.stringify(xxxx), {
        //         headers: {
        //             "Content-Type": `application/json`,
        //         },
        //     });
        //     console.log('Data sent successfully:', response.data);

        // } catch (error) {
        //     console.error('Error sending data:', error);
        // }

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
                // "environment"는 후면 카메라, "user"는 전면 카메라
                preferredCamera: "environment",
                highlightScanRegion: true,
                highlightCodeOutline: true,
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

        // Clean up
        // 스캐너 꺼지면 렌더링에서 QR 스캐너 삭제
        return () => {
            if (!videoEl?.current) {
                scanner?.current?.stop();
            }
        };
    }, []);

    // 브라우저에서 카메라 기능 허용하지 않았으면 alert 띄우기
    useEffect(() => {
        if (!qrOn) {
            alert(
                "카메라 사용 권한이 허용되어 있지 않습니다. 설정에서 권한 허용 후 다시 이용해주세요."
            );
            window.location.href = '/';
        }
    }, [qrOn]);

    return (
        <>
            <Header1 />
            <main style={{ paddingTop: "100px", height: "1000px" }}>
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
            </main>
        </>
    );
};

export default QrReader;