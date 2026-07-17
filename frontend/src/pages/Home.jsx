import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <h1>Morphix</h1>

        <p>
          Your all-in-one online toolkit for developers, image processing,
          and document utilities.
        </p>
      </section>

      <section className="categories">
        <Link to="/developer-tools" className="category-card">
          <h2>🛠 Developer Tools</h2>

          <p>
            UUID Generator, Password Generator, SHA-256,
            Base64 Encoder/Decoder, JSON Formatter.
          </p>
        </Link>

        <Link to="/image-tools" className="category-card">
          <h2>🖼 Image Tools</h2>

          <p>
            JPG → PNG, PNG → JPG, Resize Image,
            Compress Image, Crop Image, Rotate Image.
          </p>
        </Link>

        <div className="category-card disabled">
          <h2>📄 Document Tools</h2>

          <p>
            Merge PDF, Split PDF,
            Protect PDF, Unlock PDF,
            Extract PDF Text.
          </p>

          <span>Coming Soon</span>
        </div>
      </section>
    </div>
  );
}

export default Home;