import "../styles/ImageToolLayout.css";

function ImageToolLayout({
    title,
    description,
    upload,
    workspace,
    info,
    controls,
    actions
}) {

    return (

        <div className="image-tool-layout">

            <div className="tool-header-card">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>

            <div className="tool-section">
                <h2>Upload Image</h2>
                {upload}
            </div>

            <div className="tool-section">
                <h2>Workspace</h2>
                {workspace}
            </div>

            <div className="tool-bottom-grid">

                <div className="tool-section">
                    <h2>Image Information</h2>
                    {info}
                </div>

                <div className="tool-section">
                    <h2>Settings</h2>
                    {controls}
                </div>

            </div>

            {actions && (

                <div className="tool-section">

                    <h2>Actions</h2>

                    {actions}

                </div>

            )}

        </div>

    );

}

export default ImageToolLayout;