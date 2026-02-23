import { X, FileText, Download, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CertificationBriefCard({
  item,
  onClose,
  onApprove,
  onReject,
}) {
  const [loading, setLoading] = useState(null);
  const isActionable = item.taskId; // manager pending approval

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl w-full max-w-lg">
        <div className="flex justify-between px-6 py-5 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white">
            Certification Details
          </h2>
          <button onClick={onClose} className="text-slate-400">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex justify-between">
            <div>
              <p className="text-xs text-slate-400">Employee</p>
              <p className="text-slate-200 font-semibold">
                {item.employee.name || "You"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">Certification</p>
              <p className="text-slate-200 font-semibold">
                {item.certificationName}
              </p>
            </div>
          </div>

          <div className="bg-[#0B1220] p-4 rounded-xl flex items-center gap-3">
            <FileText className="text-indigo-400" />
            <span className="text-slate-300 text-sm">
              Uploaded Certification Proof
            </span>
            <Download className="ml-auto text-slate-400" />
          </div>

          {isActionable && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={async () => {
                  setLoading("reject");
                  await onReject();
                }}
                disabled={loading}
                className="flex-1 py-3 bg-rose-500/10 text-rose-400 rounded-xl"
              >
                {loading === "reject" && <Loader2 className="animate-spin" />}
                Reject
              </button>

              <button
                onClick={async () => {
                  setLoading("approve");
                  await onApprove();
                }}
                disabled={loading}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl"
              >
                {loading === "approve" && <Loader2 className="animate-spin" />}
                Approve
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
