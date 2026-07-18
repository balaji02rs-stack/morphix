import { Rnd } from "react-rnd";
import { useState } from "react";

function SelectionOverlay({
    containerWidth,
    containerHeight,
    selection,
    aspectRatio = null,
    lockAspectRatio = false,
    onChange
}) {

    const [box, setBox] = useState(selection);

    const updateSelection = (newBox) => {

        const bounded = {

            x: Math.max(
                0,
                Math.min(newBox.x, containerWidth - newBox.width)
            ),

            y: Math.max(
                0,
                Math.min(newBox.y, containerHeight - newBox.height)
            ),

            width: Math.max(
                20,
                Math.min(newBox.width, containerWidth)
            ),

            height: Math.max(
                20,
                Math.min(newBox.height, containerHeight)
            )

        };

        setBox(bounded);

        onChange?.(bounded);

    };

    return (

        <Rnd

            bounds="parent"

            position={{
                x: box.x,
                y: box.y
            }}

            size={{
                width: box.width,
                height: box.height
            }}

            enableResizing={true}

            dragGrid={[1,1]}
            resizeGrid={[1,1]}

            lockAspectRatio={
                lockAspectRatio
                    ? (aspectRatio || true)
                    : false
            }

            minWidth={20}
            minHeight={20}

            onDrag={(e, d) => {

                setBox(prev => ({
                    ...prev,
                    x: d.x,
                    y: d.y
                }));

            }}

            onDragStop={(e, d) => {

                updateSelection({
                    ...box,
                    x: d.x,
                    y: d.y
                });

            }}

            onResize={(e, dir, ref, delta, pos) => {

                setBox({

                    x: pos.x,
                    y: pos.y,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height)

                });

            }}

            onResizeStop={(e, dir, ref, delta, pos) => {

                updateSelection({

                    x: pos.x,
                    y: pos.y,
                    width: parseFloat(ref.style.width),
                    height: parseFloat(ref.style.height)

                });

            }}

            style={{
                border: "2px solid #3b82f6",
                background: "rgba(59,130,246,.12)",
                borderRadius: 6,
                boxSizing: "border-box"
            }}

        />

    );

}

export default SelectionOverlay;