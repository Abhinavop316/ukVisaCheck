import React, { useState, useRef } from "react";

export default function PassportPhotoUploader({ value, onChange, label = "Applicant Passport Photo" }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image size should be less than 10MB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = (e) => {
    e.preventDefault();
    onChange("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="govuk-form-group" style={{ marginBottom: "25px" }}>
      <label className="govuk-label govuk-label--s" htmlFor="passport-photo-input">
        {label}
      </label>
      <div className="govuk-hint">
        Upload standard passport-style portrait photo (plain background). Drag & drop or browse.
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start", flexWrap: "wrap", marginTop: "10px" }}>
        {/* Passport Photo Preview Frame */}
        <div
          style={{
            width: "140px",
            height: "175px",
            border: "2px solid #0b0c0c",
            backgroundColor: "#f3f2f1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          {value ? (
            <img
              src={value}
              alt="Passport preview"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ textAlign: "center", padding: "10px", color: "#505a5f" }}>
              <svg
                width="72"
                height="72"
                viewBox="0 0 24 24"
                fill="#b1b4b6"
                style={{ display: "block", margin: "0 auto 6px" }}
              >
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
              <span style={{ fontSize: "12px", display: "block", fontWeight: 600, color: "#505a5f" }}>
                No Photo
              </span>
            </div>
          )}
        </div>

        {/* Drag & Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            flex: "1 1 240px",
            minHeight: "175px",
            border: isDragging ? "2px dashed #1d70b8" : "2px dashed #b1b4b6",
            backgroundColor: isDragging ? "#f0f6fb" : "#fafafa",
            borderRadius: "4px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            textAlign: "center",
            transition: "all 0.2s ease-in-out",
          }}
        >
          <input
            ref={fileInputRef}
            id="passport-photo-input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFile(e.target.files[0]);
              }
            }}
          />

          <svg
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1d70b8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginBottom: "10px" }}
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <circle cx="9" cy="9" r="2" />
            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
          </svg>

          <p className="govuk-body" style={{ margin: "0 0 10px 0", fontSize: "16px" }}>
            <strong>Drag and drop</strong> passport photo here, or
          </p>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" }}>
            <button
              type="button"
              className="govuk-button govuk-button--secondary"
              style={{ margin: 0, padding: "5px 12px", fontSize: "15px" }}
              onClick={() => fileInputRef.current && fileInputRef.current.click()}
            >
              Choose Photo File
            </button>

            {value && (
              <button
                type="button"
                className="govuk-button govuk-button--warning"
                style={{ margin: 0, padding: "5px 12px", fontSize: "15px" }}
                onClick={handleRemove}
              >
                Remove Photo
              </button>
            )}
          </div>
          <span style={{ fontSize: "12px", color: "#505a5f", marginTop: "10px" }}>
            Supports JPG, PNG, WEBP up to 10MB
          </span>
        </div>
      </div>
    </div>
  );
}
