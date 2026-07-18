import { Rnd } from "react-rnd";

function ImageSelectionBox({
    width,
    height,
    x,
    y,
    lockAspectRatio = false,
    onChange,
    children
}) {

    return (
        <Rnd
            size={{
                width,
                height
            }}

            position={{
                x,
                y
            }}

            bounds="parent"

            lockAspectRatio={lockAspectRatio}

            onDragStop={(e, d) => {

                onChange({
                    width,
                    height,
                    x: d.x,
                    y: d.y
                });

            }}

            onResizeStop={(e, direction, ref, delta, position) => {

                onChange({

                    width: ref.offsetWidth,
                    height: ref.offsetHeight,

                    x: position.x,
                    y: position.y

                });

            }}
        >

            <div className="selection-box">

                {children}

            </div>

        </Rnd>
    );

}

export default ImageSelectionBox;