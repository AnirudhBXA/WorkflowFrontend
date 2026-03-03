import { X, FileText, Download, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export default function CertificationBriefCard({
  item,
  onClose,
  onApprove,
  onReject,
  showActions,
}) {
  const [loading, setLoading] = useState(null);
  const isActionable = item.status === "ASSIGNED";

  const handleDownload = async (fileName) => {
    try {
      const response = await axiosInstance.get(
        `${fileName}`,
        {
          responseType: "blob",
        }
      );
  
      const blob = new Blob([response.data]);
      const url = window.URL.createObjectURL(blob);
  
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
  
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
  
    } catch (error) {
      console.error(error);
    }
  };

  const [previewUrl, setPreviewUrl] = useState(null);

const loadPreview = async (fileName) => {
  try {
    const response = await axiosInstance.get(
      `${fileName}`,
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([response.data]);
    const url = window.URL.createObjectURL(blob);

    setPreviewUrl(url);

  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if (item?.fileUrl) {
    loadPreview(item.fileUrl);
  }

  return () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };
}, [item?.fileUrl]);

return (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    
    <div className="bg-[#111827] border border-slate-800 rounded-2xl 
                    w-full max-w-lg 
                    max-h-[90vh] flex flex-col">

      {/* Header (Always Visible) */}
      <div className="flex justify-between px-6 py-5 border-b border-slate-800 flex-shrink-0">
        <h2 className="text-xl font-bold text-white">
          Certification Details
        </h2>
        <button onClick={onClose} className="text-slate-400 hover:text-white">
          <X size={18} />
        </button>
      </div>

      {/* Scrollable Content Area */}
      <div className="overflow-y-auto p-6 space-y-4">

        {/* GRID */}
        <div className="grid grid-cols-2 gap-y-6">
          <div>
            <p className="text-xs text-slate-400">Employee</p>
            <p className="text-slate-200 font-semibold">
              {item.employee.name || "You"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Department</p>
            <p className="text-slate-200 font-semibold">
              {item.employee.department.departmentName}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Reimbursement Amount</p>
            <p className="text-slate-200 font-semibold">
              {item.reimbursementAmount || "00"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Certification</p>
            <p className="text-slate-200 font-semibold">
              {item.certificationName}
            </p>
          </div>

          <div>
            <p className="text-xs text-slate-400">Assigned Date</p>
            <p className="text-slate-200 font-semibold">
              {item.assignedDate || "00"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400">Due date</p>
            <p className="text-slate-200 font-semibold">
              {item.dueDate}
            </p>
          </div>
        </div>

        {/* FILE PREVIEW */}
        {item?.fileUrl && (
          <div className="bg-[#0B1220] p-4 rounded-xl flex flex-col gap-4">

            <div className="flex items-center gap-3">
              <FileText className="text-indigo-400" />
              <span className="text-slate-300 text-sm truncate">
                {item.fileName || "Uploaded Certificate"}
              </span>

              <Download
                onClick={() => handleDownload(item.fileUrl)}
                className="ml-auto text-slate-400 cursor-pointer hover:text-white transition"
              />
            </div>

            {previewUrl && (
              item.fileUrl.endsWith(".pdf") ? (
                <iframe
                  src={previewUrl}
                  className="w-full h-[350px] rounded-lg border border-slate-700"
                  title="Certificate Preview"
                />
              ) : (
                <img
                  src={previewUrl}
                  alt="Certificate"
                  className="w-full max-h-[350px] object-contain rounded-lg border border-slate-700"
                />
              )
            )}
          </div>
        )}

        {/* ACTION BUTTONS */}
        {showActions && isActionable && (
          <div className="flex gap-3 pt-4">
            <button
              onClick={async () => {
                setLoading("reject");
                await onReject();
              }}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 py-3 bg-rose-500/10 text-rose-400 rounded-xl"
            >
              Reject
              {loading === "reject" && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </button>

            <button
              onClick={async () => {
                setLoading("approve");
                await onApprove();
              }}
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl"
            >
              Approve
              {loading === "approve" && (
                <Loader2 className="w-4 h-4 animate-spin" />
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  </div>
);
}
