import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function TasksAndCalendar() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 5;

  useEffect(() => {
    axiosInstance.get("/data/tasks/me").then((res) => {
      setTaskData(res.data || []);
    });
  }, []);

  const toggleTask = (id) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-400";
      case "medium":
        return "bg-amber-500/10 text-amber-400";
      case "low":
        return "bg-emerald-500/10 text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  const totalPages = Math.ceil(taskData.length / PAGE_SIZE);

  const paginatedTasks = showAll
    ? taskData
    : taskData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="p-6 border-b border-slate-800 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-white">Active Tasks</h3>
          <p className="text-sm text-slate-400">
            {taskData.length} pending approvals
          </p>
        </div>

        <button
          onClick={() => {
            setShowAll((p) => !p);
            setPage(1);
          }}
          className="text-sm font-semibold text-indigo-400 hover:text-indigo-300"
        >
          {showAll ? "Show less" : "View all"}
        </button>
      </div>

      <table className="w-full">
        <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
          <tr>
            <th className="px-6 py-4 text-left">Task</th>
            <th className="px-6 py-4 text-left">Priority</th>
            <th className="px-6 py-4 text-left">Due</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-800">
          {paginatedTasks.map((task) => (
            <tr key={task.id} className="hover:bg-[#0B1220] transition">
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <button onClick={() => toggleTask(task.id)}>
                    {completedTasks.includes(task.id) ? (
                      <CheckCircle2 className="text-emerald-400" />
                    ) : (
                      <Circle className="text-slate-500" />
                    )}
                  </button>
                  <span
                    className={`text-sm font-semibold ${
                      completedTasks.includes(task.id)
                        ? "line-through text-slate-500"
                        : "text-slate-200"
                    }`}
                  >
                    {task.title}
                  </span>
                </div>
              </td>

              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold ${getPriorityBadge(
                    task.priority,
                  )}`}
                >
                  {task.priority || "Unknown"}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock size={14} />
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })
                    : "No due date"}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {!showAll && totalPages > 1 && (
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
          <span className="text-xs text-slate-500">
            Page {page} of {totalPages}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={14} />
            </button>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
