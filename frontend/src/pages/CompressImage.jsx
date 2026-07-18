import { useEffect, useState } from "react";

import api from "../services/api";

import ImageToolLayout from "../layouts/ImageToolLayout";
import ImageUpload from "../components/image/ImageUpload";
import ImageInfo from "../components/image/ImageInfo";
import ImageActions from "../components/image/ImageActions";

function CompressImage() {

    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [downloadBlob, setDownloadBlob] = useState(null);

    const [processing, setProcessing] = useState(false);

    const [quality, setQuality] = useState(80);

    const [imageInfo, setImageInfo] = useState({
        name: "",
        type: "",
        size: 0,
        width: 0,
        height: 0
    });

    useEffect(() => {

        if (!selectedFile) {

            setImageUrl(null);
            setPreviewUrl(null);
            setDownloadBlob(null);

            return;

        }

        const url = URL.createObjectURL(selectedFile);

        setImageUrl(url);

        const img = new Image();

        img.onload = () => {

            setImageInfo({

                name: selectedFile.name,
                type: selectedFile.type,
                size: selectedFile.size,
                width: img.width,
                height: img.height

            });

        };

        img.src = url;

        return () => URL.revokeObjectURL(url);

    }, [selectedFile]);
        const handleCompress = async () => {

        if (!selectedFile)
            return;

        try {

            setProcessing(true);

            const formData = new FormData();

            formData.append("file", selectedFile);
            formData.append("quality", quality / 100);

            const response = await api.post(

                "/image/compress",

                formData,

                {
                    responseType: "blob"
                }

            );

            const blob = new Blob([response.data], {

                type: "image/jpeg"

            });

            setDownloadBlob(blob);

            if (previewUrl) {

                URL.revokeObjectURL(previewUrl);

            }

            const url = URL.createObjectURL(blob);

            setPreviewUrl(url);

        } catch (err) {

            console.error(err);

            alert("Compression failed.");

        } finally {

            setProcessing(false);

        }

    };

    const handleDownload = () => {

        if (!downloadBlob)
            return;

        const url = URL.createObjectURL(downloadBlob);

        const a = document.createElement("a");

        a.href = url;

        a.download = "compressed-image.jpg";

        document.body.appendChild(a);

        a.click();

        a.remove();

        URL.revokeObjectURL(url);

    };

    const handleReset = () => {

        if (previewUrl) {

            URL.revokeObjectURL(previewUrl);

        }

        setPreviewUrl(null);

        setDownloadBlob(null);

        setQuality(80);

    };

    return (

        <>

            <ImageToolLayout

                title="Compress Image"

                description="Reduce image size while maintaining good quality."

                upload={

                    <ImageUpload

                        file={selectedFile}

                        onFileSelect={setSelectedFile}

                    />

                }

                workspace={

                    <div style={{ textAlign: "center" }}>

                        {imageUrl && (

                            <img

                                src={imageUrl}

                                alt="Original"

                                style={{

                                    maxWidth: "100%",
                                    borderRadius: 10

                                }}

                            />

                        )}

                    </div>

                }

                info={

                    <ImageInfo

                        fileName={imageInfo.name}
                        fileType={imageInfo.type}
                        fileSize={imageInfo.size}
                        width={imageInfo.width}
                        height={imageInfo.height}

                    />

                }

                controls={

                    <div className="resize-controls">

                        <label>

                            Quality: {quality}%

                        </label>

                        <input

                            type="range"

                            min="10"

                            max="100"

                            value={quality}

                            onChange={(e) =>
                                setQuality(Number(e.target.value))
                            }

                        />

                    </div>

                }

                actions={                    <ImageActions

                        primaryLabel={
                            processing
                                ? "Compressing..."
                                : "Compress"
                        }

                        onPrimary={handleCompress}

                        onReset={handleReset}

                        onDownload={handleDownload}

                        disablePrimary={
                            processing ||
                            !selectedFile
                        }

                        disableDownload={
                            !downloadBlob
                        }

                    />

                }

            />

            {previewUrl && (

                <div

                    style={{

                        maxWidth: 900,
                        margin: "30px auto",
                        background: "#111827",
                        padding: 20,
                        borderRadius: 12

                    }}

                >

                    <h2 style={{ marginBottom: 20 }}>

                        Compressed Preview

                    </h2>

                    <img

                        src={previewUrl}

                        alt="Compressed"

                        style={{

                            width: "100%",
                            borderRadius: 10

                        }}

                    />

                </div>

            )}

        </>

    );

}

export default CompressImage;
