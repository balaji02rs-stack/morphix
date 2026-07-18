import "../../styles/AspectRatioSelector.css";

const OPTIONS = [
    { label: "Free", value: null },
    { label: "1 : 1", value: 1 },
    { label: "4 : 3", value: 4 / 3 },
    { label: "3 : 2", value: 3 / 2 },
    { label: "16 : 9", value: 16 / 9 },
    { label: "9 : 16", value: 9 / 16 }
];

function AspectRatioSelector({
    value,
    onChange
}) {

    return (

        <div className="aspect-selector">

            <label className="aspect-title">

                Aspect Ratio

            </label>

            <div className="aspect-options">

                {OPTIONS.map((option) => (

                    <button

                        key={option.label}

                        type="button"

                        className={`aspect-button ${
                            value === option.value ? "active" : ""
                        }`}

                        onClick={() => onChange(option.value)}

                    >

                        {option.label}

                    </button>

                ))}

            </div>

        </div>

    );

}

export default AspectRatioSelector;