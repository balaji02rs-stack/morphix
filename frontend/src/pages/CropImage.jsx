import { useEffect, useState } from "react";

import api from "../services/api";

import ImageToolLayout from "../layouts/ImageToolLayout";

import ImageUpload from "../components/image/ImageUpload";
import ImageWorkspace from "../components/image/ImageWorkspace";
import ImageInfo from "../components/image/ImageInfo";
import ImageActions from "../components/image/ImageActions";
import AspectRatioSelector from "../components/image/AspectRatioSelector";

function CropImage() {

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
        width: 250,
        height: 250

    });

    const [cropData, setCropData] = useState({

        x: 0,
        y: 0,
        width: 250,
        height: 250

    });

    const [aspectRatio, setAspectRatio] = useState(null);

    const [loading, setLoading] = useState(false);

    const [downloadBlob, setDownloadBlob] = useState(null);

    useEffect(() => {

        if (!selectedFile) return;

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
                width: Math.min(300, img.width),
                height: Math.min(300, img.height)

            });

            setCropData({

                x: 0,
                y: 0,
                width: Math.min(300, img.width),
                height: Math.min(300, img.height)

            });

        };

        img.src = url;

        return () => URL.revokeObjectURL(url);

    }, [selectedFile]);

    const handleWorkspaceSelection = ({ display, original }) => {

        setSelection(display);

        setCropData(original);

    };
        const handleReset = () => {

        if (!imageInfo.width) return;

        setSelection({

            x: 0,
            y: 0,
            width: Math.min(300, imageInfo.width),
            height: Math.min(300, imageInfo.height)

        });

        setCropData({

            x: 0,
            y: 0,
            width: Math.min(300, imageInfo.width),
            height: Math.min(300, imageInfo.height)

        });

        setAspectRatio(null);

        setDownloadBlob(null);

    };

    const handleCrop = async () => {

        if (!selectedFile) {

            alert("Please upload an image.");

            return;

        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("file", selectedFile);

            formData.append("x", cropData.x);

            formData.append("y", cropData.y);

            formData.append("width", cropData.width);

            formData.append("height", cropData.height);

            const response = await api.post(

                "/image/crop",

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

            alert("Crop failed.");

        }

        finally {

            setLoading(false);

        }

    };

    const handleDownload = () => {

        if (!downloadBlob) return;

        const url = URL.createObjectURL(downloadBlob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "cropped-image.png";

        document.body.appendChild(link);

        link.click();

        link.remove();

        URL.revokeObjectURL(url);

    };
        return (

        <ImageToolLayout

            title="Crop Image"

            description="Crop your image by dragging the selection area."

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

                    aspectRatio={aspectRatio}

                    lockAspectRatio={aspectRatio !== null}

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

                <AspectRatioSelector

                    value={aspectRatio}

                    onChange={setAspectRatio}

                />

            }

            actions={

                <ImageActions

                    primaryLabel={

                        loading

                            ? "Cropping..."

                            : "Crop"

                    }

                    onPrimary={handleCrop}

                    onReset={handleReset}

                    onDownload={handleDownload}

                    disablePrimary={

                        loading ||

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

export default CropImage;