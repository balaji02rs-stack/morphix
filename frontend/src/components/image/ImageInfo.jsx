import {
    FaFileImage,
    FaExpand,
    FaWeightHanging,
    FaImage
} from "react-icons/fa";

import "../../styles/ImageInfo.css";

function formatFileSize(bytes) {

    if (!bytes) return "0 KB";

    const sizes = ["Bytes", "KB", "MB", "GB"];

    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;

}

function ImageInfo({

    fileName,
    fileType,
    fileSize,
    width,
    height

}) {

    if (!fileName) return null;

    return (

        <div className="image-info-card">

            <h3>

                <FaFileImage />

                Image Information

            </h3>

            <div className="info-grid">

                <div className="info-item">

                    <FaImage />

                    <div>

                        <span>File Name</span>

                        <strong>{fileName}</strong>

                    </div>

                </div>

                <div className="info-item">

                    <FaWeightHanging />

                    <div>

                        <span>File Size</span>

                        <strong>{formatFileSize(fileSize)}</strong>

                    </div>

                </div>

                <div className="info-item">

                    <FaExpand />

                    <div>

                        <span>Resolution</span>

                        <strong>

                            {width} × {height}

                        </strong>

                    </div>

                </div>

                <div className="info-item">

                    <FaFileImage />

                    <div>

                        <span>Type</span>

                        <strong>{fileType}</strong>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default ImageInfo;