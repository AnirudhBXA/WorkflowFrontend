// import { User, Calendar, GraduationCap } from "lucide-react";

// export default function TrainingCard({ data }) {
//   const statusStyles = {
//     PLANNED: "bg-indigo-50 text-indigo-700 border-indigo-100",
//     ONGOING: "bg-amber-50 text-amber-700 border-amber-100",
//     COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-100",
//   };

//   return (
//     <div className="group bg-white rounded-3xl p-6 shadow-sm border border-indigo-50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1">
//       <div className="flex justify-between items-start mb-6">
//         <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
//           <GraduationCap size={24} />
//         </div>
//         <span
//           className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${statusStyles[data.status]}`}
//         >
//           {data.status}
//         </span>
//       </div>

//       <h3 className="text-xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">
//         {data.trainingName}
//       </h3>

//       <div className="space-y-3 pt-4 border-t border-gray-50">
//         <div className="flex items-center gap-3">
//           <User size={14} className="text-gray-400" />
//           <p className="text-sm font-bold text-gray-600">
//             Trainer: <span className="text-gray-900">{data.trainerName}</span>
//           </p>
//         </div>
//         <div className="flex items-center gap-3">
//           <Calendar size={14} className="text-gray-400" />
//           <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
//             Due date : {new Date(data.dueDate).toLocaleDateString("en-US", {
//               month: "short",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { User, Calendar, GraduationCap } from "lucide-react";

export default function TrainingCard({ data }) {
  const statusStyles = {
    PLANNED: "bg-indigo-500/10 text-indigo-400",
    ONGOING: "bg-amber-500/10 text-amber-400",
    COMPLETED: "bg-emerald-500/10 text-emerald-400",
  };

  return (
    <div className="group bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-indigo-600/50 transition-all hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 rounded-xl bg-indigo-600/10 text-indigo-400">
          <GraduationCap size={22} />
        </div>
        <span
          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${statusStyles[data.status]}`}
        >
          {data.status}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-4 group-hover:text-indigo-400 transition">
        {data.trainingName}
      </h3>

      <div className="space-y-3 pt-4 border-t border-slate-800">
        <div className="flex items-center gap-3 text-sm">
          <User size={14} className="text-slate-500" />
          <span className="text-slate-400">
            Trainer:
            <span className="text-slate-200 font-semibold ml-1">
              {data.trainerName}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <Calendar size={14} className="text-slate-500" />
          <span className="text-slate-400 uppercase">
            Due date:{" "}
            {data.dueDate
              ? new Date(data.dueDate).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              : "No due date"}
          </span>
        </div>
      </div>
    </div>
  );
}
