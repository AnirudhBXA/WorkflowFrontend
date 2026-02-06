import { X, Calendar, MessageCircle } from "lucide-react";

export default function LeaveBriefCard({
  leave,
  onClose,
  onApprove,
  onReject,
}) {
  const statusColors = {
    APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    PENDING: "bg-amber-50 text-amber-700 border-amber-100",
    REJECTED: "bg-rose-50 text-rose-700 border-rose-100",
  };

  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-100 p-4">
      <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
        {/* Modal Header */}
        <div className="bg-indigo-600 p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            X
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Request Details
          </p>
          <h2 className="text-3xl font-black tracking-tight">
            {leave.leaveType}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-8 space-y-8">
          <div className="flex items-center justify-between border-b border-gray-50 pb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Duration
                </p>
                <p className="font-bold text-gray-800">
                  {new Date(leave.startDate).toLocaleDateString()} —{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <span
              className={`px-4 py-1 rounded-full border text-[10px] font-black uppercase ${statusColors[leave.status]}`}
            >
              {leave.status}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
              <MessageCircle size={14} /> Reason for request
            </p>
            <p className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic border border-gray-100 leading-relaxed">
              "{leave.reason}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            {leave.status === "PENDING" && (
              <>
                <button
                  onClick={onReject}
                  className="flex-1 px-6 py-4 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-colors"
                >
                  Reject
                </button>
                <button
                  onClick={onApprove}
                  className="flex-1 px-6 py-4 text-sm font-bold text-white bg-indigo-600 shadow-lg shadow-indigo-100 hover:bg-indigo-700 rounded-2xl transition-all active:scale-95"
                >
                  Approve
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
