import "./../../styles/ImageWorkspace.css";

function ImageSlider({
    label,
    min = 0,
    max = 100,
    step = 1,
    value,
    unit = "",
    onChange
}) {

    return (

        <div className="slider-container">

            <div className="slider-header">

                <span>{label}</span>

                <strong>
                    {value}
                    {unit}
                </strong>

            </div>

            <input
                className="image-slider"
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) =>
                    onChange(Number(e.target.value))
                }
            />

        </div>

    );

}

export default ImageSlider;