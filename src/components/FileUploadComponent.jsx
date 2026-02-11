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
  const [uploadResult, setUploadResult] = useState(null); // Added for backend response

  const [selectedWorkflow, setSelectedWorkflow] = useState({
    workflowName: "Select-Workflow",
    relatedApi: "",
  });
  const [workflowOptions, setWorkFlowOptions] = useState([]);

  const role = "HR"; // Get from AuthContext

  useEffect(() => {
    const options = [{ workflowName: "Select-Workflow", relatedApi: "" }];
    if (role === "HR") {
      options.push(
        {
          workflowName: "Leave Workflow",
          relatedApi: "/leaves/workflow/upload-leave-requests",
        },
        {
          workflowName: "Certifications",
          relatedApi: "/certifications/upload",
        },
        { workflowName: "Interview Workflow", relatedApi: "/interview/upload" },
        {
          workflowName: "Timesheet Workflow",
          relatedApi: "/timesheets/upload",
        },
        { workflowName: "Trainings Workflow", relatedApi: "/trainings/upload" },
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
    setUploadResult(null); // Reset result on new file select
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
    setUploadResult(null);
    setSelectedWorkflow({ workflowName: "Select-Workflow", relatedApi: "" });
  }

  
async function handleFileUpload() {
  if (!fileToUpload || !selectedWorkflow?.relatedApi) return;

  const formData = new FormData();
  formData.append("file", fileToUpload);

  try {
    setIsUploading(true);
    setUploadResult(null); 

    const response = await axiosInstance.post(selectedWorkflow.relatedApi, formData, {
      headers: { "Content-Type": "multipart/form-data" },
      onUploadProgress: (p) => setUploadProgress(Math.round((p.loaded * 100) / p.total)),
    });

    setUploadResult(response.data);
    
  } catch (error) {
    console.error(error);
    alert("Upload failed.");
  } finally {
    setIsUploading(false);
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
          {/* STEP 1: Configuration */}
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
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-xl font-bold text-gray-700 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none outline-none appearance-none cursor-pointer"
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
                  column headers.
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
                <input
                  ref={inputRef}
                  type="file"
                  hidden
                  accept=".xlsx"
                  onChange={(e) => handleFile(e.target.files[0])}
                />
              </div>
            ) : (
              <div className="space-y-6">
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
                  {uploadProgress === 100 && !isUploading && (
                    <CheckCircle2 className="text-emerald-500 w-8 h-8" />
                  )}
                </div>

                {isUploading && (
                  <div className="space-y-2 px-2">
                    <div className="flex justify-between text-xs font-black text-indigo-600 uppercase tracking-widest">
                      <span>Uploading & Processing</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-3 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all duration-300 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
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
                    className="flex-2 px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl hover:bg-indigo-700 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUploading ? "Processing..." : "Confirm & Import"}{" "}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        
        {/* SUMMARY STATS BAR */}
        {uploadResult && (
  <div className="space-y-6 animate-in fade-in slide-in-from-top-4">
    {/* The 3 Stats Boxes */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm transition-all hover:shadow-md">
        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Total Rows</p>
        <p className="text-3xl font-black text-gray-900">{uploadResult.totalRows}</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-emerald-50 shadow-sm transition-all hover:shadow-md">
        <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">Successful</p>
        <p className="text-3xl font-black text-emerald-600">{uploadResult.successCount}</p>
      </div>
      <div className="bg-white p-6 rounded-3xl border border-rose-50 shadow-sm transition-all hover:shadow-md">
        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest mb-1">Failed</p>
        <p className="text-3xl font-black text-rose-600">{uploadResult.failureCount}</p>
      </div>
    </div>

    {/* Only show "Complete" button if there are no errors */}
    {uploadResult.failureCount === 0 && (
      <div className="flex justify-center">
        <button
          onClick={handleCancel}
          className="px-8 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all active:scale-95 flex items-center gap-2"
        >
          <CheckCircle2 size={18} />
          Finalize & Done
        </button>
      </div>
    )}
  </div>
)}
        {/* ERROR SUMMARY TABLE - Only visible if failures exist */}
        {uploadResult && uploadResult.failureCount > 0 && (
          <div className="animate-in fade-in slide-in-from-top-6 duration-500">
            <div className="bg-white rounded-3xl shadow-xl shadow-rose-100/50 border border-rose-100 overflow-hidden">
              <div className="p-6 bg-rose-50 border-b border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertCircle className="text-rose-600" />
                  <h3 className="font-black text-rose-900 text-sm uppercase tracking-widest">
                    Import Errors Identified
                  </h3>
                </div>
                <span className="px-4 py-1 bg-rose-200 text-rose-700 rounded-full text-xs font-black">
                  {uploadResult.failureCount} ROWS FAILED
                </span>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="sticky top-0 bg-gray-50 shadow-sm">
                    <tr className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                      <th className="px-8 py-4">Row</th>
                      <th className="px-8 py-4">Employee</th>
                      <th className="px-8 py-4">Reference</th>
                      <th className="px-8 py-4 text-rose-600">
                        Error Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {uploadResult.errors.map((err, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-rose-50/30 transition-colors"
                      >
                        <td className="px-8 py-5 font-black text-gray-400">
                          #{err.rowNumber}
                        </td>
                        <td className="px-8 py-5 font-bold text-gray-700">
                          {err.identifier}
                        </td>
                        <td className="px-8 py-5 text-xs font-medium text-gray-400 italic">
                          {err.details}
                        </td>
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm">
                            <X size={14} className="stroke-[3px]" />{" "}
                            {err.errorMessage}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadComponent;
