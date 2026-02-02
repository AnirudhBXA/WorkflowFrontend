import { useRef, useState } from "react";

function FileUploadComponent() {
  const inputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const startUpload = (file) => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(true);

    // Fake upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setIsUploading(false);
        setUploadedFile(file);
      }
    }, 300);
  };

  const handleFile = (file) => {
    if (!file) return;
    startUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div >
      {/* <div className="bg-white w-[420px] rounded-xl shadow-xl p-6"> */}
        
        {/* Header */}
        {/* <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Add Preview Images!
          </h2>
          <button className="text-gray-400 hover:text-gray-600">✕</button>
        </div> */}

        {/* Upload Box */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition
            ${
              isDragging
                ? "border-blue-500 bg-blue-50"
                : "border-gray-200 hover:border-blue-400"
            }`}
        >
          <div className="flex justify-center mb-3 text-blue-600">
            ⬆️
          </div>

          <p className="text-sm text-gray-700">
            Drag & Drop or{" "}
            <span className="text-blue-600 font-medium">
              Choose file
            </span>{" "}
            to upload
          </p>

          <p className="text-xs text-gray-400 mt-1">
            fig, zip, pdf, png, jpeg
          </p>

          <input
            ref={inputRef}
            type="file"
            hidden
            onChange={(e) => handleFile(e.target.files[0])}
            accept=".fig,.zip,.pdf,.png,.jpeg,.jpg"
          />
        </div>

        {/* Upload Progress */}
        {isUploading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-600 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Uploaded File Card */}
        {uploadedFile && (
          <div className="mt-4 p-3 border rounded-lg flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700">
                {uploadedFile.name}
              </p>
              <p className="text-xs text-gray-400">
                {uploadedFile.type || "Unknown format"}
              </p>
            </div>
            <span className="text-green-600 text-sm font-medium">
              Uploaded
            </span>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100">
            Cancel
          </button>
          <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700">
            Import
          </button>
        </div>
      {/* </div> */}
    </div>
  );
}

export default FileUploadComponent;
