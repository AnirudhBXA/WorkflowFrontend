import { User, Calendar, GraduationCap } from "lucide-react";

export default function TrainingCard({ data }) {
  const statusStyles = {
    PLANNED: "bg-indigo-50 text-indigo-700 border-indigo-100",
    ONGOING: "bg-amber-50 text-amber-700 border-amber-100",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-100",
  };

  return (
    <div className="group bg-white rounded-3xl p-6 shadow-sm border border-indigo-50 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 hover:-translate-y-1">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <GraduationCap size={24} />
        </div>
        <span
          className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${statusStyles[data.status]}`}
        >
          {data.status}
        </span>
      </div>

      <h3 className="text-xl font-black text-gray-900 tracking-tight mb-4 group-hover:text-indigo-600 transition-colors">
        {data.trainingName}
      </h3>

      <div className="space-y-3 pt-4 border-t border-gray-50">
        <div className="flex items-center gap-3">
          <User size={14} className="text-gray-400" />
          <p className="text-sm font-bold text-gray-600">
            Trainer: <span className="text-gray-900">{data.trainerName}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={14} className="text-gray-400" />
          <p className="text-xs font-bold text-gray-500 uppercase tracking-tight">
            Due date : {new Date(data.dueDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
