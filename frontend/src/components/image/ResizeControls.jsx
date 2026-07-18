import "../../styles/ResizeControls.css";

function ResizeControls({
    width,
    height,
    lockRatio,
    processing,
    onWidthChange,
    onHeightChange,
    onLockRatioChange
}) {
    return (
        <div className="resize-controls">

            <div className="input-group">
                <label>Width (px)</label>

                <input
                    type="number"
                    value={width}
                    min="1"
                    disabled={processing}
                    onChange={(e) => onWidthChange(e.target.value)}
                />
            </div>

            <div className="input-group">
                <label>Height (px)</label>

                <input
                    type="number"
                    value={height}
                    min="1"
                    disabled={processing}
                    onChange={(e) => onHeightChange(e.target.value)}
                />
            </div>

            <label className="checkbox-group">

                <input
                    type="checkbox"
                    checked={lockRatio}
                    disabled={processing}
                    onChange={(e) =>
                        onLockRatioChange(e.target.checked)
                    }
                />

                Maintain Aspect Ratio

            </label>

        </div>
    );
}

export default ResizeControls;