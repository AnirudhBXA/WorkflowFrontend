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
  const [uploadResult, setUploadResult] = useState(null);

  const [selectedWorkflow, setSelectedWorkflow] = useState({
    workflowName: "Select-Workflow",
    relatedApi: "",
  });
  const [workflowOptions, setWorkFlowOptions] = useState([]);

  const role = "HR";

  useEffect(() => {
    const options = [{ workflowName: "Select-Workflow", relatedApi: "" }];
    if (role === "HR") {
      options.push(
        {
          workflowName: "Leave Workflow",
          relatedApi: "/leaves/workflow/upload-leave-requests",
        },
        {
          workflowName: "Certification Workflow",
          relatedApi: "/certifications/upload",
        },
        { workflowName: "Interview Workflow", relatedApi: "/interview/upload" },
        {
          workflowName: "Timesheet Workflow",
          relatedApi: "/timesheets/upload",
        },
        { workflowName: "Trainings Workflow", relatedApi: "/trainings/upload" },
      );
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
    setUploadResult(null);
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

      const response = await axiosInstance.post(
        selectedWorkflow.relatedApi,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (p) =>
            setUploadProgress(Math.round((p.loaded * 100) / p.total)),
        },
      );

      setUploadResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#0F172A] p-6 lg:p-10">
      <div className="max-w-6xl mx-auto space-y-10">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Bulk Data <span className="text-indigo-400">Import</span>
          </h1>
          <p className="text-slate-400 font-medium mt-1">
            Upload Excel files to trigger automated workflows
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Configuration */}
          <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-indigo-600/10 rounded-xl text-indigo-400">
                <Settings2 size={20} />
              </div>
              <h2 className="font-bold text-white">Configuration</h2>
            </div>

            <label className="text-xs font-bold text-slate-400 uppercase">
              Process Target
            </label>
            <select
              className="w-full mt-2 px-4 py-3 bg-[#0B1220] border border-slate-700 rounded-xl text-slate-200 font-semibold focus:ring-2 focus:ring-indigo-500/20 outline-none"
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

            <div className="mt-4 p-4 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-sm text-indigo-300">
              Ensure correct Excel column mapping before upload.
            </div>
          </div>

          {/* Upload Area */}
          <div className="lg:col-span-2 bg-[#111827] border border-slate-800 rounded-2xl p-8">
            <div className="flex justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600/10 rounded-xl text-purple-400">
                  <CloudUpload size={20} />
                </div>
                <h2 className="font-bold text-white">File Upload</h2>
              </div>
              {fileToUpload && (
                <button
                  onClick={handleCancel}
                  className="text-slate-400 hover:text-rose-400"
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
                className={`border-2 border-dashed rounded-3xl p-14 text-center cursor-pointer transition
                  ${
                    isDragging
                      ? "border-indigo-500 bg-indigo-600/10"
                      : "border-slate-700 hover:border-indigo-400 hover:bg-[#0B1220]"
                  }`}
              >
                <FileSpreadsheet className="mx-auto mb-4 text-indigo-400 w-10 h-10" />
                <p className="text-lg font-bold text-white">
                  Drop Excel file here
                </p>
                <p className="text-slate-400 mt-1">or click to browse</p>
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
                <div className="flex items-center gap-4 p-6 bg-[#0B1220] border border-slate-700 rounded-2xl">
                  <FileSpreadsheet className="text-indigo-400" size={28} />
                  <div className="flex-1">
                    <p className="font-bold text-white truncate">
                      {fileToUpload.name}
                    </p>
                    <p className="text-xs text-slate-400">
                      {(fileToUpload.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  {uploadProgress === 100 && !isUploading && (
                    <CheckCircle2 className="text-emerald-400" />
                  )}
                </div>

                {isUploading && (
                  <div>
                    <div className="flex justify-between text-xs text-indigo-400 mb-1">
                      <span>Uploading</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-indigo-600 transition-all"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={handleCancel}
                    className="flex-1 py-3 rounded-xl text-slate-400 hover:bg-[#0B1220]"
                  >
                    Discard
                  </button>
                  <button
                    onClick={handleFileUpload}
                    disabled={isUploading || !selectedWorkflow?.relatedApi}
                    className="px-8 py-3 bg-indigo-600 rounded-xl font-bold text-white hover:bg-indigo-500 disabled:opacity-50 flex items-center gap-2"
                  >
                    {isUploading ? "Processing..." : "Confirm & Import"}
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Summary */}
        {uploadResult && (
          <div className="grid md:grid-cols-3 gap-4">
            {[
              ["Total Rows", uploadResult.totalRows, "text-slate-200"],
              ["Successful", uploadResult.successCount, "text-emerald-400"],
              ["Failed", uploadResult.failureCount, "text-rose-400"],
            ].map(([label, value, color]) => (
              <div
                key={label}
                className="bg-[#111827] border border-slate-800 rounded-2xl p-6"
              >
                <p className="text-xs uppercase text-slate-400">{label}</p>
                <p className={`text-3xl font-black ${color}`}>{value}</p>
              </div>
            ))}
          </div>
        )}

        {/* Error Table */}
        {uploadResult?.failureCount > 0 && (
          <div className="bg-[#111827] border border-rose-500/20 rounded-2xl overflow-hidden">
            <div className="p-5 bg-rose-500/10 border-b border-rose-500/20 flex gap-3 items-center">
              <AlertCircle className="text-rose-400" />
              <h3 className="font-bold text-rose-300 text-sm uppercase">
                Import Errors
              </h3>
            </div>

            <div className="max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#0B1220] text-slate-400 uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4">Row</th>
                    <th className="px-6 py-4">Employee</th>
                    <th className="px-6 py-4">Details</th>
                    <th className="px-6 py-4 text-rose-400">Error</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {uploadResult.errors.map((err, i) => (
                    <tr key={i} className="hover:bg-[#0B1220]">
                      <td className="px-6 py-4 text-slate-400">
                        #{err.rowNumber}
                      </td>
                      <td className="px-6 py-4 text-slate-200 font-semibold">
                        {err.identifier}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-400 italic">
                        {err.details}
                      </td>
                      <td className="px-6 py-4 text-rose-400 font-semibold">
                        {err.errorMessage}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUploadComponent;
