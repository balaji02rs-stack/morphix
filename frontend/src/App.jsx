import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DeveloperTools from "./pages/DeveloperTools";
import UUIDGenerator from "./pages/UUIDGenerator";
import PasswordGenerator from "./pages/PasswordGenerator";
import SHA256Generator from "./pages/SHA256Generator";
import Base64Tool from "./pages/Base64Tool";
import JsonFormatter from "./pages/JsonFormatter";

import ImageTools from "./pages/ImageTools";
import JpgToPng from "./pages/JpgToPng";
import PngToJpg from "./pages/PngToJpg";
import ResizeImage from "./pages/ResizeImage";
import CompressImage from "./pages/CompressImage";
import CropImage from "./pages/CropImage";
import RotateImage from "./pages/RotateImage";

import DocumentTools from "./pages/DocumentTools";
import MergePdf from "./pages/MergePdf";
import SplitPdf from "./pages/SplitPdf";
import ProtectPdf from "./pages/ProtectPdf";
import UnlockPdf from "./pages/UnlockPdf";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/developer-tools" element={<DeveloperTools />} />
        <Route path="/developer-tools/uuid" element={<UUIDGenerator />} />
        <Route path="/developer-tools/password" element={<PasswordGenerator />} />
        <Route path="/developer-tools/sha256" element={<SHA256Generator />} />
        <Route path="/developer-tools/base64" element={<Base64Tool />} />
        <Route path="/developer-tools/json" element={<JsonFormatter />} />

        <Route path="/image-tools" element={<ImageTools />} />
        <Route path="/image-tools/jpg-to-png" element={<JpgToPng />} />
        <Route path="/image-tools/png-to-jpg" element={<PngToJpg />} />
        <Route path="/image-tools/resize" element={<ResizeImage />} />
        <Route path="/image-tools/crop" element={<CropImage />} />
        <Route path="/document-tools" element={<DocumentTools />} />
<Route path="/document-tools/merge" element={<MergePdf />} />
<Route
    path="/document-tools/unlock"
    element={<UnlockPdf />}
/>
<Route
    path="/document-tools/protect"
    element={<ProtectPdf />}
/>
<Route
    path="/document-tools/split"
    element={<SplitPdf />}
/>
        <Route
    path="/image-tools/rotate"
    element={<RotateImage />}
/>
        
<Route
  path="/image-tools/compress"
  element={<CompressImage />}
/>
        <Route path="*" element={<h1 style={{ padding: "40px" }}>404 - Page Not Found</h1>} />
      </Routes>
      <ToastContainer
  position="top-right"
  autoClose={2000}
  theme="dark"
/>
    </>
    
  );
}

export default App;