import { useEffect, useState } from "react";

import ImageToolLayout from "../layouts/ImageToolLayout";
import ImageUpload from "../components/image/ImageUpload";
import ImageWorkspace from "../components/image/ImageWorkspace";
import ImageInfo from "../components/image/ImageInfo";
import ImageActions from "../components/image/ImageActions";
import ResizeControls from "../components/image/ResizeControls";
import api from "../services/api";

function ResizeImage() {

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

    const [resizeWidth, setResizeWidth] = useState(300);

    const [resizeHeight, setResizeHeight] = useState(300);

    const [lockRatio, setLockRatio] = useState(true);

    const [originalRatio, setOriginalRatio] = useState(1);

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

            setResizeWidth(img.width);

            setResizeHeight(img.height);

            setOriginalRatio(img.width / img.height);

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

    const handleWidthChange = (value) => {

        const width = Number(value);

        if (width <= 0)
            return;

        setResizeWidth(width);

        if (lockRatio) {

            const height = Math.round(width / originalRatio);

            setResizeHeight(height);

        }

    };

    const handleHeightChange = (value) => {

        const height = Number(value);

        if (height <= 0)
            return;

        setResizeHeight(height);

        if (lockRatio) {

            const width = Math.round(height * originalRatio);

            setResizeWidth(width);

        }

    };
        const handleWorkspaceSelection = ({ display, original }) => {

        setSelection(display);

        setResizeWidth(original.width);

        setResizeHeight(original.height);

    };

    const handleReset = () => {

        if (!imageInfo.width)
            return;

        setResizeWidth(imageInfo.width);

        setResizeHeight(imageInfo.height);

        setSelection({

            x: 0,

            y: 0,

            width: imageInfo.width,

            height: imageInfo.height

        });

        setDownloadBlob(null);

    };

    const handleResize = async () => {

        if (!selectedFile)
            return;

        try {

            setProcessing(true);

            const formData = new FormData();

            formData.append("file", selectedFile);

            formData.append("width", resizeWidth);

            formData.append("height", resizeHeight);

            const response = await api.post(

                "/image/resize",

                formData,

                {

                    responseType: "blob"

                }

            );

            const blob = new Blob([response.data]);

            setDownloadBlob(blob);

        }

        catch (error) {

            console.error(error);

            alert("Failed to resize image.");

        }

        finally {

            setProcessing(false);

        }

    };

    const handleDownload = () => {

        if (!downloadBlob)
            return;

        const url = URL.createObjectURL(downloadBlob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "resized-image.png";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    };
        return (

        <ImageToolLayout

            title="Resize Image"

            description="Resize images without losing quality."

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

                    showOverlay

                    lockAspectRatio={lockRatio}

                    aspectRatio={lockRatio ? originalRatio : null}

                    onSelectionChange={handleWorkspaceSelection}

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

                <ResizeControls

                    width={resizeWidth}

                    height={resizeHeight}

                    lockRatio={lockRatio}

                    processing={processing}

                    onWidthChange={handleWidthChange}

                    onHeightChange={handleHeightChange}

                    onLockRatioChange={setLockRatio}

                />

            }

            actions={

                <ImageActions

                    primaryLabel={

                        processing

                            ? "Resizing..."

                            : "Resize"

                    }

                    onPrimary={handleResize}

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

    );

}

export default ResizeImage;