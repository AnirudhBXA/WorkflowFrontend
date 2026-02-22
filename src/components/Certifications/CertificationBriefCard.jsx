import { X, User, Calendar, FileText, Download, Loader2 } from "lucide-react";
import { useState } from "react";

export default function CertificationBriefCard({
  item,
  onClose,
  onApprove,
  onReject,
}) {
  const [loading, setLoading] = useState(null);
  const attachment = { name: "Certification_Proof.pdf", size: "2.3 MB" };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-800">
          <h2 className="text-xl font-extrabold text-white">
            Certification Review
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="p-2 rounded-lg hover:bg-[#0B1220] text-slate-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-xs uppercase text-slate-400">Employee</p>
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <User size={14} />
                {item.employeeName}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400">Valid Until</p>
              <div className="flex items-center gap-2 text-slate-200 font-semibold">
                <Calendar size={14} />
                Jan 2029
              </div>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase text-slate-400 mb-2">
              Verification Document
            </p>
            <div className="flex items-center gap-4 p-4 bg-[#0B1220] border border-slate-800 rounded-xl">
              <div className="w-12 h-12 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center">
                <FileText size={22} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-white truncate">
                  {attachment.name}
                </p>
                <p className="text-xs text-slate-400">{attachment.size}</p>
              </div>
              <Download size={18} className="text-slate-400" />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={async () => {
                setLoading("reject");
                await onReject();
              }}
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading === "reject" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Reject
            </button>

            <button
              onClick={async () => {
                setLoading("approve");
                await onApprove();
              }}
              disabled={loading}
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading === "approve" && (
                <Loader2 size={16} className="animate-spin" />
              )}
              Approve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
