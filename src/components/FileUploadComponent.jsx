import { useEffect, useRef, useState } from "react";

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
        { workflowName : "Leave Workflow" , relatedApi : "/api/leaves/upload-leave-requests" },
        { workflowName : "Certifications" , relatedApi : "/api/certifications/upload" },
        { workflowName : "Interview Workflow" , relatedApi : "/api/interview/upload" },
        { workflowName : "Select-Workflow" , relatedApi : "" },
      ])
    }
    else if(role==="MANAGER"){
      setWorkFlowOptions([
        { workflowName : "Select-Workflow" , relatedApi : "" },
        { workflowName : "Training Workflow" , relatedApi : "/api/trainings/upload" },
      ])
    }
    
  },[])

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
    setFileToUpload(file);
    startUpload(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

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
      const response = await axios.post(
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
  }
  

  return (
    <div>
      {/* <div className="bg-white w-[420px] rounded-xl shadow-xl p-6"> */}

      <div>
        <label>Select Workflow: </label>
        <select
          value={selectedWorkflow.workflowName}
          onChange={(e) => {
            const selectedName = e.target.value;
            const workflow = workflowOptions.find(
              (w) => w.workflowName === selectedName
            );
            setSelectedWorkflow(workflow);
          }}
        >
          {workflowOptions.map((item) => (
            <option key={item.workflowName} value={item}>{item.workflowName}</option>
          ))}
        </select>
      </div>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
          <h2 className="text-sm font-semibold text-gray-800">
            Upload your file here
          </h2>
        </div>

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
        <div className="flex justify-center mb-3 text-blue-600">⬆️</div>

        <p className="text-sm text-gray-700">
          Drag & Drop or{" "}
          <span className="text-blue-600 font-medium">Choose file</span> to
          upload
        </p>

        <p className="text-xs text-gray-400 mt-1">excel</p>

        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={(e) => handleFile(e.target.files[0])}
          accept=".xlsx"
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
          <span className="text-green-600 text-sm font-medium">Uploaded</span>
        </div>
      )}

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">
        <button className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100">
          Cancel
        </button>
        <button className="px-4 py-2 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-700"
        onClick={handelFileUpload}
        >
          Upload
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}

export default FileUploadComponent;
