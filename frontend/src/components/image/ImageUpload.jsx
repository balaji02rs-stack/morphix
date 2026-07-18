import { useRef, useState } from "react";
import "../../styles/ImageUpload.css";

function ImageUpload({
    file,
    onFileSelect,
    accept = "image/*"
}) {

    const inputRef = useRef(null);

    const [dragActive, setDragActive] = useState(false);

    const handleFile = (selectedFile) => {

        if (!selectedFile)
            return;

        if (!selectedFile.type.startsWith("image/")) {

            alert("Please select a valid image file.");

            return;

        }

        onFileSelect(selectedFile);

    };

    const handleChange = (e) => {

        handleFile(e.target.files[0]);

    };

    const handleDrop = (e) => {

        e.preventDefault();

        setDragActive(false);

        handleFile(e.dataTransfer.files[0]);

    };

    const removeFile = () => {

        onFileSelect(null);

        if (inputRef.current) {

            inputRef.current.value = "";

        }

    };

    return (

        <div className="image-upload">

            <input
                ref={inputRef}
                type="file"
                accept={accept}
                hidden
                onChange={handleChange}
            />

            {!file ? (

                <div

                    className={`upload-box ${dragActive ? "drag-active" : ""}`}

                    onClick={() => inputRef.current.click()}

                    onDragOver={(e) => {

                        e.preventDefault();

                        setDragActive(true);

                    }}

                    onDragLeave={() => setDragActive(false)}

                    onDrop={handleDrop}

                >

                    <div className="upload-icon">

                        📷

                    </div>

                    <h3>Drop your image here</h3>

                    <p>or click to browse</p>

                    <small>

                        JPG • PNG • JPEG • WEBP

                    </small>

                </div>

            ) : (

                <div className="selected-file">

                    <div>

                        <h3>{file.name}</h3>

                        <p>

                            {(file.size / 1024).toFixed(1)} KB

                        </p>

                    </div>

                    <div className="upload-buttons">

                        <button

                            onClick={() => inputRef.current.click()}

                        >

                            Replace

                        </button>

                        <button

                            className="remove-btn"

                            onClick={removeFile}

                        >

                            Remove

                        </button>

                    </div>

                </div>

            )}

        </div>

    );

}

export default ImageUpload;