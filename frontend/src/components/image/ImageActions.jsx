import "../../styles/ImageActions.css";

function ImageActions({
    primaryLabel = "Apply",
    onPrimary,
    onReset,
    onDownload,
    disablePrimary = false,
    disableReset = false,
    disableDownload = false
}) {
    return (
        <div className="image-actions">

            <button
                className="action-btn primary-btn"
                onClick={onPrimary}
                disabled={disablePrimary}
            >
                {primaryLabel}
            </button>

            <button
                className="action-btn secondary-btn"
                onClick={onReset}
                disabled={disableReset}
            >
                Reset
            </button>

            <button
                className="action-btn success-btn"
                onClick={onDownload}
                disabled={disableDownload}
            >
                Download
            </button>

        </div>
    );
}

export default ImageActions;