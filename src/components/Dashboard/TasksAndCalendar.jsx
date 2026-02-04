"use client";

import { useState } from "react";
import { CheckCircle2, Circle, ChevronLeft, ChevronRight } from "lucide-react";

const tasksData = [
  {
    id: 1,
    title: "Complete Q1 Project Report",
    priority: "high",
    status: "pending",
    dueDate: "2024-02-10",
  },
  {
    id: 2,
    title: "Review Team Submissions",
    priority: "high",
    status: "in-progress",
    dueDate: "2024-02-05",
  },
  {
    id: 3,
    title: "Client Meeting Preparation",
    priority: "medium",
    status: "completed",
    dueDate: "2024-02-03",
  },
  {
    id: 4,
    title: "Update Project Documentation",
    priority: "medium",
    status: "pending",
    dueDate: "2024-02-08",
  },
  {
    id: 5,
    title: "Budget Allocation Review",
    priority: "high",
    status: "pending",
    dueDate: "2024-02-12",
  },
  {
    id: 6,
    title: "Performance Metrics Analysis",
    priority: "low",
    status: "pending",
    dueDate: "2024-02-15",
  },
];

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1, 3));
  const today = new Date(2026, 1, 3);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  ).getDate();
  const firstDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  ).getDay();

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= daysInMonth; i++) days.push(i);

  const monthName = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
          {monthName}
        </h4>
        <div className="flex gap-1">
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() - 1),
              )
            }
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronLeft
              size={16}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>
          <button
            onClick={() =>
              setCurrentDate(
                new Date(currentDate.getFullYear(), currentDate.getMonth() + 1),
              )
            }
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <ChevronRight
              size={16}
              className="text-gray-600 dark:text-gray-400"
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div
            key={d}
            className="text-center text-xs font-bold text-gray-600 dark:text-gray-400 py-2"
          >
            {d}
          </div>
        ))}

        {days.map((day, idx) => {
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={idx}
              className={`aspect-square flex items-center justify-center rounded-md text-sm font-medium ${
                day === null
                  ? "text-transparent"
                  : isToday
                    ? "bg-blue-500 text-white"
                    : "bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div className="p-3 bg-blue-50 dark:bg-blue-900 rounded-md border border-blue-200 dark:border-blue-800">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
          Today:{" "}
          {today.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  );
}

export default function TasksAndCalendar() {
  const [completedTasks, setCompletedTasks] = useState([]);

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

  const getStatusColor = (status, done) => {
    if (done) return "bg-green-500";
    return status === "in-progress" ? "bg-blue-500" : "bg-yellow-500";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
      {/* Tasks */}
      <div className="lg:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-t-4 border-purple-500">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Tasks
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tasksData.length} tasks assigned
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
                {tasksData.map((task) => (
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
                          {task.title}
                        </span>
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getPriorityBadge(task.priority)}`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                      {new Date(task.dueDate).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${getStatusColor(task.status, completedTasks.includes(task.id))}`}
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

      {/* Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border-t-4 border-cyan-500 p-6">
        <Calendar />
      </div>
    </div>
  );
}
