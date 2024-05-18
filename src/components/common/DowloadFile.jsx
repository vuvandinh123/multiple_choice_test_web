import React from "react";

const FileDownloadComponent = () => {
  const fileName = "demo-file.json";

  const handleDownload = async () => {
    try {
      const fileUrl = `https://res.cloudinary.com/dwvttgtcw/raw/upload/v1715583161/di4i8hfot6h57ofu9jkz.json`;
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      const fileUrl2 = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = fileUrl2;
      link.download = fileName;
      link.click();
      URL.revokeObjectURL(fileUrl);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload} className="hover:text-pink-500">
        Tải xuống file json mẫu
      </button>
    </div>
  );
};

export default FileDownloadComponent;
