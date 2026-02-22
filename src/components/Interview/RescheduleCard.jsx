// import { X, Calendar, User, Mail, ArrowRight } from "lucide-react";

// export default function RescheduleCard({ data, setData, onClose, onConfirm }) {
//   return (
//     <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-100 p-4">
//       <div className="bg-[#0b1220] border border-slate-800 rounded-4xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
//         <div className="bg-amber-500 p-8 text-[#0b1220] relative">
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 p-2 bg-black/10 rounded-xl hover:bg-black/20 transition-colors"
//           >
//             <X size={20} />
//           </button>
//           <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
//             HR Management
//           </p>
//           <h2 className="text-2xl font-black tracking-tight">
//             Reschedule Session
//           </h2>
//         </div>

//         <div className="p-8 space-y-5">
//           {/* Candidate - Read Only/Display */}
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
//               Candidate
//             </label>
//             <div className="relative group">
//               <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
//               <input
//                 type="text"
//                 disabled
//                 value={data.userName}
//                 className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 font-medium cursor-not-allowed"
//               />
//             </div>
//           </div>

//           {/* New Interviewer Email */}
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">
//               Assign New Interviewer
//             </label>
//             <div className="relative group">
//               <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
//               <input
//                 type="email"
//                 value={data.newInterviewerEmail}
//                 onChange={(e) =>
//                   setData({ ...data, newInterviewerEmail: e.target.value })
//                 }
//                 placeholder="interviewer@company.com"
//                 className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-white transition-all font-medium"
//               />
//             </div>
//           </div>

//           {/* New Proposed Date */}
//           <div className="space-y-1.5">
//             <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">
//               New Proposed Date
//             </label>
//             <div className="relative group">
//               <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
//               <input
//                 type="datetime-local"
//                 value={data.newDate}
//                 onChange={(e) => setData({ ...data, newDate: e.target.value })}
//                 className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-white transition-all font-medium scheme-dark"
//               />
//             </div>
//           </div>

//           <div className="flex gap-4 pt-4">
//             <button
//               onClick={onClose}
//               className="flex-1 px-6 py-4 text-sm font-bold text-slate-400 hover:bg-slate-900 rounded-2xl transition-colors border border-transparent hover:border-slate-800"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={() => onConfirm(data)}
//               className="flex-1 px-6 py-4 text-sm font-bold text-[#0b1220] bg-amber-500 shadow-xl shadow-amber-500/10 hover:bg-amber-400 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
//             >
//               Update <ArrowRight size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { X, Calendar, User, Mail, ArrowRight } from "lucide-react";

export default function RescheduleCard({ data, setData, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[100] p-4">
      <div className="bg-[#0b1220] border border-slate-800 rounded-4xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div className="bg-amber-500 p-8 text-[#0b1220] relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-black/10 rounded-xl hover:bg-black/20 transition-colors"
          >
            <X size={20} />
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            HR Management
          </p>
          <h2 className="text-2xl font-black tracking-tight">
            Reschedule Session
          </h2>
        </div>

        <div className="p-8 space-y-5">
          {/* Candidate - Read Only */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">
              Candidate
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                disabled
                value={data.userName}
                className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 font-medium cursor-not-allowed"
              />
            </div>
          </div>

          {/* New Interviewer Email */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">
              Assign New Interviewer
            </label>
            <div className="relative group">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="email"
                value={data.newInterviewerEmail}
                onChange={(e) =>
                  setData({ ...data, newInterviewerEmail: e.target.value })
                }
                placeholder="interviewer@company.com"
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-white transition-all font-medium"
              />
            </div>
          </div>

          {/* New Proposed Date */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-indigo-400 uppercase tracking-widest ml-1">
              New Proposed Date
            </label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-slate-500 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="datetime-local"
                value={data.newDate}
                onChange={(e) => setData({ ...data, newDate: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 text-white transition-all font-medium [color-scheme:dark]"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 text-sm font-bold text-slate-400 hover:bg-slate-900 rounded-2xl transition-colors border border-transparent hover:border-slate-800"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(data)}
              className="flex-1 px-6 py-4 text-sm font-bold text-[#0b1220] bg-amber-500 shadow-xl shadow-amber-500/10 hover:bg-amber-400 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Update <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
