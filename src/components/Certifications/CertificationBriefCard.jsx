// import { X, User, Calendar, FileText, Download } from "lucide-react";

// export default function CertificationBriefCard({
//   item,
//   onClose,
//   onApprove,
//   onReject,
// }) {
//   const attachment = { name: "Certification_Proof_092.pdf", size: "2.3 MB" };
//   return (
//     <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-100 p-4">
//       <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in duration-200">
//         <div className="bg-indigo-600 p-10 text-white relative">
//           <button
//             onClick={onClose}
//             className="absolute top-8 right-8 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
//           >
//             <X size={20} />
//           </button>
//           <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70 mb-2">
//             Audit View
//           </p>
//           <h2 className="text-3xl font-black tracking-tight">
//             {item?.name || "Credential Audit"}
//           </h2>
//         </div>

//         <div className="p-10 space-y-8">
//           <div className="grid grid-cols-2 gap-6">
//             <div className="space-y-1">
//               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
//                 Candidate
//               </p>
//               <div className="flex items-center gap-2 font-bold text-gray-800">
//                 <User size={14} className="text-indigo-500" />{" "}
//                 {item?.employeeName}
//               </div>
//             </div>
//             <div className="space-y-1">
//               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
//                 Valid Until
//               </p>
//               <div className="flex items-center gap-2 font-bold text-gray-800">
//                 <Calendar size={14} className="text-indigo-500" /> Jan 2029
//               </div>
//             </div>
//           </div>

//           <div className="space-y-3">
//             <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
//               Verification Document
//             </p>
//             <div className="group flex items-center gap-4 p-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-indigo-50 transition-colors cursor-pointer">
//               <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-indigo-600">
//                 <FileText size={24} />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-bold text-gray-900 truncate">
//                   {attachment.name}
//                 </p>
//                 <p className="text-xs text-gray-500 font-medium">
//                   {attachment.size}
//                 </p>
//               </div>
//               <Download
//                 size={18}
//                 className="text-gray-400 group-hover:text-indigo-600 transition-colors"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4 pt-4">
//             <button
//               onClick={onReject}
//               className="flex-1 py-4 text-sm font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl transition-all"
//             >
//               Reject
//             </button>
//             <button
//               onClick={onApprove}
//               className="flex-1 py-4 text-sm font-bold text-white bg-indigo-600 shadow-xl shadow-indigo-100 hover:bg-indigo-700 rounded-2xl transition-all active:scale-95"
//             >
//               Approve Claim
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

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
