import { useEffect, useState } from "react";

import api from "../services/api";

import ImageToolLayout from "../layouts/ImageToolLayout";

import ImageUpload from "../components/image/ImageUpload";
import ImageWorkspace from "../components/image/ImageWorkspace";
import ImageInfo from "../components/image/ImageInfo";
import ImageActions from "../components/image/ImageActions";

function RotateImage() {

    const [selectedFile, setSelectedFile] = useState(null);

    const [imageUrl, setImageUrl] = useState(null);

    const [imageInfo, setImageInfo] = useState({

        name: "",
        type: "",
        size: 0,
        width: 0,
        height: 0

    });

    const [selection, setSelection] = useState({

        x: 0,
        y: 0,
        width: 300,
        height: 300

    });

    const [angle, setAngle] = useState(90);

    const [processing, setProcessing] = useState(false);

    const [downloadBlob, setDownloadBlob] = useState(null);

    useEffect(() => {

        if (!selectedFile)
            return;

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

            setSelection({

                x: 0,
                y: 0,
                width: img.width,
                height: img.height

            });

        };

        img.src = url;

        return () => URL.revokeObjectURL(url);

    }, [selectedFile]);

    const handleReset = () => {

        if (!imageInfo.width)
            return;

        setAngle(90);

        setSelection({

            x: 0,
            y: 0,
            width: imageInfo.width,
            height: imageInfo.height

        });

        setDownloadBlob(null);

    };
        const handleRotate = async () => {

        if (!selectedFile) {
            alert("Please upload an image.");
            return;
        }

        try {

            setProcessing(true);

            const formData = new FormData();

            formData.append("file", selectedFile);
            formData.append("angle", angle);

            const response = await api.post(

                "/image/rotate",

                formData,

                {
                    responseType: "blob"
                }

            );

            const blob = new Blob([response.data]);

            setDownloadBlob(blob);

        } catch (error) {

            console.error(error);

            alert("Failed to rotate image.");

        } finally {

            setProcessing(false);

        }

    };

    const handleDownload = () => {

        if (!downloadBlob)
            return;

        const url = URL.createObjectURL(downloadBlob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "rotated-image.png";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    };

    return (

        <ImageToolLayout

            title="Rotate Image"

            description="Rotate your image by 90°, 180° or 270°."

            upload={

                <ImageUpload

                    file={selectedFile}

                    onFileSelect={setSelectedFile}

                />

            }

            workspace={

                <ImageWorkspace

                    imageUrl={imageUrl}

                    originalWidth={imageInfo.width}

                    originalHeight={imageInfo.height}

                    selection={selection}

                />

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

                    <div className="input-group">

                        <label>Rotation Angle</label>

                        <select

                            value={angle}

                            onChange={(e) => setAngle(Number(e.target.value))}

                            disabled={processing}

                        >

                            <option value={90}>90°</option>

                            <option value={180}>180°</option>

                            <option value={270}>270°</option>

                        </select>

                    </div>

                </div>

            }

            actions={                <ImageActions

                    primaryLabel={
                        processing
                            ? "Rotating..."
                            : "Rotate"
                    }

                    onPrimary={handleRotate}

                    onReset={handleReset}

                    onDownload={handleDownload}

                    disablePrimary={
                        processing ||
                        !selectedFile
                    }

                    disableReset={
                        !selectedFile
                    }

                    disableDownload={
                        !downloadBlob
                    }

                />

            }

        />

    );

}

export default RotateImage;