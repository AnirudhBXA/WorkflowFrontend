import { useEffect, useState } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function TasksAndCalendar() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const fetchUserTasks = async () => {
    try {
      const response = await axiosInstance.get("/data/tasks/me");
      setTaskData(response.data || []);
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
    switch (priority?.toLowerCase()) {
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

  const getStatusColor = (status, done) => {
    if (done) return "bg-green-500";
    return status === "in-progress" ? "bg-blue-500" : "bg-yellow-500";
  };

  return (
    <div className="grid grid-cols-1 gap-6 w-full">
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tasks
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {taskData.length} tasks assigned
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-4 text-left">Task</th>
                  <th className="px-6 py-4 text-left">Priority</th>
                  <th className="px-6 py-4 text-left">Due Date</th>
                  <th className="px-6 py-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {taskData.map((task) => (
                  <tr
                    key={task.id}
                    className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className="flex items-center gap-3 text-left"
                      >
                        {completedTasks.includes(task.id) ? (
                          <CheckCircle2 size={20} className="text-green-500" />
                        ) : (
                          <Circle
                            size={20}
                            className="text-gray-300 dark:text-gray-600"
                          />
                        )}
                        <span
                          className={
                            completedTasks.includes(task.id)
                              ? "line-through text-gray-400"
                              : "text-gray-900 dark:text-gray-100"
                          }
                        >
                          {task.title || "Untitled Task"}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(
                          task.priority,
                        )}`}
                      >
                        {task.priority || "N/A"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(
                            task.status,
                            completedTasks.includes(task.id),
                          )}`}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {completedTasks.includes(task.id)
                            ? "Done"
                            : task.status === "in-progress"
                              ? "In Progress"
                              : "Pending"}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
