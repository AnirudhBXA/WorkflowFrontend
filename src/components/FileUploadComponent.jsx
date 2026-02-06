import axios from "axios";
import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function FileUploadComponent() {
  const inputRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);


  const [selectedWorkflow, setSelectedWorkflow] = useState({ workflowName : "Select-Workflow" , relatedApi : "" })
  const [workflowOptions, setWorkFlowOptions] = useState([])
  const role = "HR";
  useEffect( () => {

    if(role==="HR"){
      setWorkFlowOptions([
        { workflowName : "Select-Workflow" , relatedApi : "" },
        { workflowName : "Leave Workflow" , relatedApi : "/leaves/upload-leave-requests" },
        { workflowName : "Certifications" , relatedApi : "/certifications/upload" },
        { workflowName : "Interview Workflow" , relatedApi : "/interview/upload" },
      ])
    }
    else if(role==="MANAGER"){
      setWorkFlowOptions([
        { workflowName : "Select-Workflow" , relatedApi : "" },
        { workflowName : "Training Workflow" , relatedApi : "/trainings/upload" },
      ])
    }
    
  },[])

  const startUpload = (file) => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(true);
  };

  const handleFile = (file) => {
    if (!file) return;
    setFileToUpload(file);
    startUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  function handleCancel() {
    // Clear file input
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  
    // Reset upload states
    setFileToUpload(null);
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setIsDragging(false);
  
    // Reset workflow selection
    setSelectedWorkflow({
      workflowName: "Select-Workflow",
      relatedApi: "",
    });
  }
  

  async function handelFileUpload() {
    if (!fileToUpload) {
      alert("Please select a file");
      return;
    }
  
    if (!selectedWorkflow?.relatedApi) {
      alert("Please select a workflow");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", fileToUpload);
  
    try {
      const response = await axiosInstance.post(
        selectedWorkflow.relatedApi,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent); // REAL progress
          },
        }
      );
  
      alert("File uploaded successfully");
      console.log(response.data);
  
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
    finally{
      handleCancel();
    }
  }
  

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* LEFT: Workflow Selection */}
        <div className="bg-white rounded-xl shadow-md p-5 max-h-[150px]">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Select Workflow
          </h3>
  
          <select
            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            value={selectedWorkflow.workflowName}
            onChange={(e) => {
              const workflow = workflowOptions.find(
                (w) => w.workflowName === e.target.value
              );
              setSelectedWorkflow(workflow);
            }}
          >
            {workflowOptions.map((item) => (
              <option key={item.workflowName} value={item.workflowName}>
                {item.workflowName}
              </option>
            ))}
          </select>
  
          <p className="text-xs text-gray-400 mt-2">
            Choose the workflow to process the uploaded file
          </p>
        </div>
  
        {/* RIGHT: Upload */}
        <div className="bg-white rounded-xl shadow-md p-5">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">
            Upload File
          </h3>
  
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current.click()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
              ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              }`}
          >
            <div className="text-3xl mb-3">📄</div>
  
            <p className="text-sm text-gray-700">
              Drag & drop your Excel file
            </p>
            <p className="text-xs text-gray-400 mt-1">or click to browse</p>
  
            <input
              ref={inputRef}
              type="file"
              hidden
              accept=".xlsx"
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>
          {/* Uploaded Files Grid */}
          {fileToUpload && (
            <div className="max-w-5xl mx-auto mt-8">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">
                Uploaded Files
              </h3>
      
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-white border rounded-lg p-4 shadow-sm">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {fileToUpload.name}
                  </p>
                </div>
              </div>
            </div>
          )}
  
          {/* Footer Buttons */}
          <div className="flex justify-end gap-3 mt-5">


            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
            >
              Cancel
            </button>
  
            <button
              onClick={handelFileUpload}
              disabled={!fileToUpload || !selectedWorkflow?.relatedApi}
              className={`px-4 py-2 text-sm rounded-md text-white
                ${
                  fileToUpload && selectedWorkflow?.relatedApi
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Upload
            </button>
          </div>
        </div>
      </div>
  
      
    </div>
  );
  
}

export default FileUploadComponent;
