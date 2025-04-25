import React, { useState } from "react";

const modalStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 999,
};

const contentStyle = {
  backgroundColor: "#fff",
  borderRadius: "8px",
  padding: "20px",
  width: "400px",
  position: "relative",
};

const UploadPhoto = () => {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/jpg")) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      alert("Only JPEG or JPG files are allowed.");
    }
  };

  const handleUpload = () => {
    alert("Photo uploaded successfully!");
    handleClose();
  };

  return (
    <>
      <button
        onClick={handleOpen}
        style={{
          padding: "10px 20px",
          backgroundColor: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Upload Photo
      </button>

      {open && (
        <div style={modalStyle}>
          <div style={contentStyle}>
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              ✕
            </button>
            <h2>Upload Your Photo</h2>

            <div
              style={{
                width: "150px",
                height: "150px",
                margin: "20px auto",
                border: "1px solid #ccc",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundImage: selectedImage ? `url(${selectedImage})` : "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                color: "#888",
              }}
            >
              {!selectedImage && "2x2 Preview"}
            </div>

            <label style={{ display: "block", marginBottom: "10px" }}>
              <input
                type="file"
                accept=".jpg,.jpeg"
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span
                style={{
                  display: "inline-block",
                  padding: "10px 15px",
                  backgroundColor: "#eee",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Choose File
              </span>
            </label>

            <button
              onClick={handleUpload}
              disabled={!selectedImage}
              style={{
                padding: "10px 20px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: selectedImage ? "pointer" : "not-allowed",
                width: "100%",
              }}
            >
              Upload
            </button>

            <div style={{ marginTop: "20px", fontSize: "14px", color: "#333" }}>
              <strong>Guidelines:</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Size: 2" x 2"</li>
                <li>Color: Your photo must be in color</li>
                <li>Background: White</li>
                <li>Face centered and straight</li>
                <li>File must be jpeg or jpg</li>
                <li>Attire must be formal</li>
              </ul>
              <strong>How to Change the Photo?</strong>
              <ul style={{ paddingLeft: "20px" }}>
                <li>Click X Button</li>
                <li>Click Choose File and select photo</li>
                <li>Click Upload button</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UploadPhoto;
