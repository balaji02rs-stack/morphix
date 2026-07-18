import { useEffect, useMemo, useState } from "react";
import "../../styles/ImageWorkspace.css";
import SelectionOverlay from "./SelectionOverlay";

const MAX_WIDTH = 900;
const MAX_HEIGHT = 550;

function ImageWorkspace({
    imageUrl,
    originalWidth,
    originalHeight,
    selection,
    showOverlay = false,
    aspectRatio = null,
    lockAspectRatio = false,
    onSelectionChange
}) {

    const [displaySize, setDisplaySize] = useState({
        width: 0,
        height: 0
    });

    useEffect(() => {

        if (!originalWidth || !originalHeight)
            return;

        const ratio = Math.min(
            MAX_WIDTH / originalWidth,
            MAX_HEIGHT / originalHeight,
            1
        );

        setDisplaySize({
            width: Math.round(originalWidth * ratio),
            height: Math.round(originalHeight * ratio)
        });

    }, [originalWidth, originalHeight]);

    const scale = useMemo(() => {

        if (!displaySize.width || !displaySize.height) {

            return {
                scaleX: 1,
                scaleY: 1
            };

        }

        return {

            scaleX: originalWidth / displaySize.width,

            scaleY: originalHeight / displaySize.height

        };

    }, [displaySize, originalWidth, originalHeight]);

    const handleOverlayChange = (box) => {

        if (!onSelectionChange)
            return;

        onSelectionChange({

            display: box,

            original: {

                x: Math.round(box.x * scale.scaleX),

                y: Math.round(box.y * scale.scaleY),

                width: Math.round(box.width * scale.scaleX),

                height: Math.round(box.height * scale.scaleY)

            }

        });

    };

    return (

        <div className="workspace-container">

            {!imageUrl && (

                <div className="workspace-placeholder">

                    <h3>No Image Selected</h3>

                    <p>Upload an image to begin editing.</p>

                </div>

            )}

            {imageUrl && (

                <div
                    className="workspace-preview"
                    style={{
                        width: displaySize.width,
                        height: displaySize.height
                    }}
                >

                    <img
                        src={imageUrl}
                        alt="Preview"
                        className="workspace-image"
                        style={{
                            width: displaySize.width,
                            height: displaySize.height
                        }}
                    />

                    {showOverlay && selection && (

                        <SelectionOverlay

                            containerWidth={displaySize.width}

                            containerHeight={displaySize.height}

                            selection={selection}

                            aspectRatio={aspectRatio}

                            lockAspectRatio={lockAspectRatio}

                            onChange={handleOverlayChange}

                        />

                    )}

                </div>

            )}

        </div>

    );

}

export default ImageWorkspace;