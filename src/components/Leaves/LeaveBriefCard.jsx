// import { X, Calendar, MessageCircle } from "lucide-react";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// export default function LeaveBriefCard({
//   leave,
//   onClose,
//   onApprove,
//   onReject,
// }) {
//   const statusColors = {
//     APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-100",
//     PENDING: "bg-amber-50 text-amber-700 border-amber-100",
//     REJECTED: "bg-rose-50 text-rose-700 border-rose-100",
//   };

//   const { user } = useContext(AuthContext);

//   return (
//     <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-100 p-4">
//       <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
//         {/* Modal Header */}
//         <div className="bg-indigo-600 p-8 text-white relative">
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
//           >
//             X
//           </button>
//           <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
//             Request Details
//           </p>
//           <h2 className="text-3xl font-black tracking-tight">
//             {leave.leaveType}
//           </h2>
//         </div>

//         {/* Modal Body */}
//         <div className="p-8 space-y-8">
//           <div className="flex items-center justify-between border-b border-gray-50 pb-6">
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
//                 <Calendar size={20} />
//               </div>
//               <div>
//                 <p className="text-xs font-bold text-gray-400 uppercase">
//                   Duration
//                 </p>
//                 <p className="font-bold text-gray-800">
//                   {new Date(leave.startDate).toLocaleDateString()} —{" "}
//                   {new Date(leave.endDate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>
//             <span
//               className={`px-4 py-1 rounded-full border text-[10px] font-black uppercase ${statusColors[leave.status]}`}
//             >
//               {leave.status}
//             </span>
//           </div>

//           <div className="space-y-2">
//             <p className="text-xs font-bold text-gray-400 uppercase flex items-center gap-2">
//               <MessageCircle size={14} /> Reason for request
//             </p>
//             <p className="bg-gray-50 p-4 rounded-2xl text-gray-700 italic border border-gray-100 leading-relaxed">
//               "{leave.reason}"
//             </p>
//           </div>

//           {/* Action Buttons */}
//           { user?.role === "MANAGER" && (
//             <div className="flex gap-4 pt-4">
//             {leave.status === "PENDING" && (
//               <>
//                 <button
//                   onClick={onReject}
//                   className="flex-1 px-6 py-4 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-colors"
//                 >
//                   Reject
//                 </button>
//                 <button
//                   onClick={onApprove}
//                   className="flex-1 px-6 py-4 text-sm font-bold text-white bg-indigo-600 shadow-lg shadow-indigo-100 hover:bg-indigo-700 rounded-2xl transition-all active:scale-95"
//                 >
//                   Approve
//                 </button>
//               </>
//             )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { X, Calendar, MessageCircle } from "lucide-react";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// export default function LeaveBriefCard({
//   leave,
//   onClose,
//   onApprove,
//   onReject,
// }) {
//   const statusColors = {
//     APPROVED: "bg-emerald-500/10 text-emerald-400",
//     PENDING: "bg-amber-500/10 text-amber-400",
//     REJECTED: "bg-rose-500/10 text-rose-400",
//   };

//   const { user } = useContext(AuthContext);

//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
//       <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
//         <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800">
//           <div>
//             <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
//               Leave Request
//             </p>
//             <h2 className="text-2xl font-extrabold text-white tracking-tight">
//               {leave.leaveType}
//             </h2>
//           </div>
//           <button
//             onClick={onClose}
//             className="p-2 rounded-lg hover:bg-[#0B1220] text-slate-400 hover:text-white transition"
//           >
//             <X size={18} />
//           </button>
//         </div>

//         <div className="p-6 space-y-6">
//           <div className="flex items-center justify-between bg-[#0B1220] border border-slate-800 rounded-xl p-4">
//             <div className="flex items-center gap-3">
//               <div className="p-3 rounded-xl bg-indigo-600/10 text-indigo-400">
//                 <Calendar size={18} />
//               </div>
//               <div>
//                 <p className="text-xs uppercase font-semibold text-slate-400">
//                   Duration
//                 </p>
//                 <p className="text-sm font-semibold text-slate-200">
//                   {new Date(leave.startDate).toLocaleDateString()} —{" "}
//                   {new Date(leave.endDate).toLocaleDateString()}
//                 </p>
//               </div>
//             </div>

//             <span
//               className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${statusColors[leave.status]}`}
//             >
//               {leave.status}
//             </span>
//           </div>

//           <div className="space-y-2">
//             <p className="text-xs uppercase font-semibold text-slate-400 flex items-center gap-2">
//               <MessageCircle size={14} />
//               Reason
//             </p>
//             <div className="bg-[#0B1220] border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
//               {leave.reason || "No reason provided"}
//             </div>
//           </div>

//           {user?.role === "MANAGER" && leave.status === "PENDING" && (
//             <div className="flex gap-3 pt-4">
//               <button
//                 onClick={onReject}
//                 className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition"
//               >
//                 Reject
//               </button>
//               <button
//                 onClick={onApprove}
//                 className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition active:scale-95"
//               >
//                 Approve
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import { X, Calendar, MessageCircle, Loader2 } from "lucide-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LeaveBriefCard({
  leave,
  onClose,
  onApprove,
  onReject,
}) {
  const { user } = useContext(AuthContext);
  const [loadingAction, setLoadingAction] = useState(null);

  const statusColors = {
    APPROVED: "bg-emerald-500/10 text-emerald-400",
    PENDING: "bg-amber-500/10 text-amber-400",
    REJECTED: "bg-rose-500/10 text-rose-400",
  };

  const handleApprove = async () => {
    setLoadingAction("approve");
    await onApprove();
  };

  const handleReject = async () => {
    setLoadingAction("reject");
    await onReject();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
        <div className="flex items-start justify-between px-6 py-5 border-b border-slate-800">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
              Leave Request
            </p>
            <h2 className="text-2xl font-extrabold text-white tracking-tight">
              {leave.leaveType}
            </h2>
          </div>
          <button
            onClick={onClose}
            disabled={loadingAction}
            className="p-2 rounded-lg hover:bg-[#0B1220] text-slate-400 hover:text-white transition disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between bg-[#0B1220] border border-slate-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-indigo-600/10 text-indigo-400">
                <Calendar size={18} />
              </div>
              <div>
                <p className="text-xs uppercase font-semibold text-slate-400">
                  Duration
                </p>
                <p className="text-sm font-semibold text-slate-200">
                  {new Date(leave.startDate).toLocaleDateString()} —{" "}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
            </div>

            <span
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${statusColors[leave.status]}`}
            >
              {leave.status}
            </span>
          </div>

          <div className="space-y-2">
            <p className="text-xs uppercase font-semibold text-slate-400 flex items-center gap-2">
              <MessageCircle size={14} />
              Reason
            </p>
            <div className="bg-[#0B1220] border border-slate-800 rounded-xl p-4 text-sm text-slate-300 leading-relaxed">
              {leave.reason || "No reason provided"}
            </div>
          </div>

          {user?.role === "MANAGER" && leave.status === "PENDING" && (
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleReject}
                disabled={loadingAction}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loadingAction === "reject" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {loadingAction === "reject" ? "Rejecting..." : "Reject"}
              </button>

              <button
                onClick={handleApprove}
                disabled={loadingAction}
                className="flex-1 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loadingAction === "approve" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {loadingAction === "approve" ? "Approving..." : "Approve"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
