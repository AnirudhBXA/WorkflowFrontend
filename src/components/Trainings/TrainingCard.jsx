import { User, Calendar, GraduationCap, Clock } from "lucide-react";

export default function TrainingCard({ data, onComplete, completingTaskId }) {
  const statusStyles = {
    ASSIGNED: "bg-indigo-500/10 text-indigo-400",
    COMPLETED: "bg-emerald-500/10 text-emerald-400",
    GRACE_PERIOD: "bg-rose-500/10 text-rose-400",
  };

  const isCompleting =
    completingTaskId !== -1 && completingTaskId === data.taskId;

  const canComplete =
    data.taskId &&
    (data.status === "ASSIGNED" || data.status === "GRACE_PERIOD");

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="group bg-[#111827] border border-slate-800 rounded-2xl p-6 hover:border-indigo-600/50 transition-all hover:-translate-y-1">
      {/* HEADER */}
      <div className="flex justify-between items-start mb-5">
        <div className="p-3 rounded-xl bg-indigo-600/10 text-indigo-400">
          <GraduationCap size={22} />
        </div>

        <span
          className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${
            statusStyles[data.status]
          }`}
        >
          {data.status}
        </span>
      </div>

      {/* TITLE */}
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition">
        {data.trainingName}
      </h3>

      <p className="text-xs text-slate-500 mb-4">
        Training ID: {data.trainingId}
      </p>

      {/* DETAILS */}
      <div className="space-y-3 border-t border-slate-800 pt-4">
        <div className="flex items-center gap-3 text-sm">
          <User size={14} className="text-slate-500" />
          <span className="text-slate-400">
            Trainer:
            <span className="text-slate-200 font-semibold ml-1">
              {data.trainerName}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-3 text-sm">
          <Calendar size={14} className="text-slate-500" />
          <span className="text-slate-400">
            Due:{" "}
            <span className="text-slate-200">{formatDate(data.dueDate)}</span>
          </span>
        </div>

        {data.graceDueDate && (
          <div className="flex items-center gap-3 text-sm">
            <Clock size={14} className="text-slate-500" />
            <span className="text-slate-400">
              Grace Until:
              <span className="text-rose-400 font-semibold ml-1">
                {formatDate(data.graceDueDate)}
              </span>
            </span>
          </div>
        )}
      </div>

      {/* ACTION BUTTON */}
      {canComplete && (
        <button
          onClick={() => onComplete(data.taskId)}
          disabled={isCompleting}
          className="mt-5 w-full px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-500 transition flex items-center justify-center"
        >
          {isCompleting ? (
            <div className="h-4 w-4 border-t-2 border-white rounded-full animate-spin" />
          ) : (
            "Mark Complete"
          )}
        </button>
      )}
    </div>
  );
}
