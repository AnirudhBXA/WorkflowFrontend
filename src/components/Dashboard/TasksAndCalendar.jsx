import { useEffect, useState } from "react";
import { CheckCircle2, ChevronRight, Circle, Clock } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function TasksAndCalendar() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const fetchUserTasks = async () => {
    try {
      const response = await axiosInstance.get("/data/tasks/me");
      setTaskData(response.data || []);
      console.log("Fetched tasks:", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchUserTasks();
  }, []);

  const toggleTask = (id) => {
    setCompletedTasks((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200";
      case "medium":
        return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200";
      case "low":
        return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200";
      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-indigo-50 shadow-sm overflow-hidden">
      <div className="p-8 flex items-center justify-between border-b border-gray-50">
        <div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight">
            Active Tasks
          </h3>
          <p className="text-sm text-gray-500 font-medium mt-1">
            You have {taskData.length} items to complete
          </p>
        </div>
        <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
          View All Tasks
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 bg-gray-50/50">
              <th className="px-8 py-4 text-left">Task Description</th>
              <th className="px-8 py-4 text-left">Priority</th>
              <th className="px-8 py-4 text-left">Timeline</th>
              <th className="px-8 py-4 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {taskData.map((task) => (
              <tr
                key={task.id}
                className="group hover:bg-indigo-50/30 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className="transition-transform active:scale-90"
                    >
                      {completedTasks.includes(task.id) ? (
                        <CheckCircle2 size={22} className="text-emerald-500" />
                      ) : (
                        <Circle
                          size={22}
                          className="text-gray-300 group-hover:text-indigo-400 transition-colors"
                        />
                      )}
                    </button>
                    <span
                      className={`text-sm font-bold ${completedTasks.includes(task.id) ? "text-gray-400 line-through" : "text-gray-700"}`}
                    >
                      {task.title}
                    </span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getPriorityBadge(task.priority)}`}
                  >
                    {task?.priority || "Unknown"}
                  </span>
                </td>

                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
                    <Clock size={14} className="text-gray-400" />
                    {task.dueDate
                      ? new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })
                      : "No Date"}
                  </div>
                </td>
                <td className="px-8 py-5 text-center">
                  <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
                    <ChevronRight size={16} className="text-gray-400" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
