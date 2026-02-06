import { useEffect, useRef, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import {
  CloudUpload,
  FileSpreadsheet,
  X,
  CheckCircle2,
  AlertCircle,
  Settings2,
  ChevronRight,
} from "lucide-react";

function FileUploadComponent() {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [selectedWorkflow, setSelectedWorkflow] = useState({
    workflowName: "Select-Workflow",
    relatedApi: "",
  });
  const [workflowOptions, setWorkFlowOptions] = useState([]);

  const role = "HR"; // This should ideally come from your AuthContext

  useEffect(() => {
    const options = [{ workflowName: "Select-Workflow", relatedApi: "" }];
    if (role === "HR") {
      options.push(
        {
          workflowName: "Leave Workflow",
          relatedApi: "/leaves/upload-leave-requests",
        },
        {
          workflowName: "Certifications",
          relatedApi: "/certifications/upload",
        },
        { workflowName: "Interview Workflow", relatedApi: "/interview/upload" },
      );
    } else if (role === "MANAGER") {
      options.push({
        workflowName: "Training Workflow",
        relatedApi: "/trainings/upload",
      });
    }
    setWorkFlowOptions(options);
  }, [role]);

  const handleFile = (file) => {
    if (!file || !file.name.endsWith(".xlsx")) {
      alert("Please upload a valid Excel (.xlsx) file");
      return;
    }
    setFileToUpload(file);
    setUploadProgress(0);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  function handleCancel() {
    if (inputRef.current) inputRef.current.value = null;
    setFileToUpload(null);
    setUploadProgress(0);
    setIsUploading(false);
    setSelectedWorkflow({ workflowName: "Select-Workflow", relatedApi: "" });
  }

  async function handleFileUpload() {
    if (!fileToUpload || !selectedWorkflow?.relatedApi) return;

    const formData = new FormData();
    formData.append("file", fileToUpload);

    try {
      setIsUploading(true);
      await axiosInstance.post(selectedWorkflow.relatedApi, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percent);
        },
      });
      // Success state logic here
    } catch (error) {
      console.error(error);
      alert("Upload failed. Please check the file format.");
    } finally {
      setIsUploading(false);
      if (uploadProgress === 100) handleCancel();
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#FDFDFF] p-4 lg:p-10">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Bulk Data <span className="text-indigo-600">Import</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic">
            Upload Excel files to trigger automated system workflows
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* STEP 1: Select Workflow */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-sm border border-indigo-50 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                <Settings2 size={20} />
              </div>
              <h2 className="font-bold text-gray-800">Configuration</h2>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
                Process Target
              </label>
              <select
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-700 focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none appearance-none cursor-pointer"
                value={selectedWorkflow.workflowName}
                onChange={(e) => {
                  const workflow = workflowOptions.find(
                    (w) => w.workflowName === e.target.value,
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
              <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100/50">
                <p className="text-xs text-indigo-700 leading-relaxed font-medium">
                  Ensures data is mapped to the correct module. Please verify
                  column headers in your file match the module requirements.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 2: Upload Area */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-indigo-50 p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
                  <CloudUpload size={20} />
                </div>
                <h2 className="font-bold text-gray-800">File Drop</h2>
              </div>
              {fileToUpload && (
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {!fileToUpload ? (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
                className={`group border-2 border-dashed rounded-4xl p-12 text-center cursor-pointer transition-all duration-300
                  ${isDragging ? "border-indigo-500 bg-indigo-50/50 scale-[0.99]" : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50"}`}
              >
                <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileSpreadsheet className="text-indigo-600 w-10 h-10" />
                </div>
                <p className="text-xl font-black text-gray-900 tracking-tight">
                  Drop Excel file here
                </p>
                <p className="text-gray-500 font-medium mt-2">
                  or{" "}
                  <span className="text-indigo-600 underline">
                    browse your device
                  </span>
                </p>
                <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em] mt-8">
                  Supported: .XLSX, .CSV
                </p>
                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept=".xlsx,.csv"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                <div className="flex items-center gap-4 p-6 bg-indigo-50 rounded-4xl border border-indigo-100">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-indigo-600">
                    <FileSpreadsheet size={28} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-lg font-black text-gray-900 truncate">
                      {fileToUpload.name}
                    </p>
                    <p className="text-sm font-bold text-gray-400">
                      {(fileToUpload.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  {uploadProgress === 100 && (
                    <CheckCircle2 className="text-emerald-500 w-8 h-8" />
                  )}
                </div>

                {/* Progress Bar */}
                {isUploading && (
                  <div className="space-y-2 px-2">
                    <div className="flex justify-between text-xs font-black text-indigo-600 uppercase tracking-widest">
                      <span>Uploading Content</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-colors"
                  >
                    Discard File
                  </button>
                  <button
                    onClick={handleFileUpload}
                    disabled={isUploading || !selectedWorkflow?.relatedApi}
                    className="flex-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUploading ? "Processing..." : "Confirm & Import"}{" "}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUploadComponent;
