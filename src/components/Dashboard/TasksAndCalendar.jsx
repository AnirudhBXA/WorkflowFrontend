// import { useEffect, useState } from "react";
// import { CheckCircle2, ChevronRight, Circle, Clock } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";

// export default function TasksAndCalendar() {
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [taskData, setTaskData] = useState([]);
//   const fetchUserTasks = async () => {
//     try {
//       const response = await axiosInstance.get("/data/tasks/me");
//       setTaskData(response.data || []);
//       console.log("Fetched tasks:", response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUserTasks();
//   }, []);

//   const toggleTask = (id) => {
//     setCompletedTasks((prev) =>
//       prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
//     );
//   };

//   const getPriorityBadge = (priority) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200";
//       case "medium":
//         return "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-200";
//       case "low":
//         return "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-200";
//       default:
//         return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200";
//     }
//   };

//   return (
//     <div className="bg-white rounded-3xl border border-indigo-50 shadow-sm overflow-hidden">
//       <div className="p-8 flex items-center justify-between border-b border-gray-50">
//         <div>
//           <h3 className="text-xl font-bold text-gray-900 tracking-tight">
//             Active Tasks
//           </h3>
//           <p className="text-sm text-gray-500 font-medium mt-1">
//             You have {taskData.length} items to complete
//           </p>
//         </div>
//         <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
//           View All Tasks
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="text-[11px] font-black uppercase tracking-widest text-gray-400 bg-gray-50/50">
//               <th className="px-8 py-4 text-left">Task Description</th>
//               <th className="px-8 py-4 text-left">Priority</th>
//               <th className="px-8 py-4 text-left">Timeline</th>
//               <th className="px-8 py-4 text-center">Action</th>
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-50">
//             {taskData.map((task) => (
//               <tr
//                 key={task.id}
//                 className="group hover:bg-indigo-50/30 transition-colors"
//               >
//                 <td className="px-8 py-5">
//                   <div className="flex items-center gap-4">
//                     <button
//                       onClick={() => toggleTask(task.id)}
//                       className="transition-transform active:scale-90"
//                     >
//                       {completedTasks.includes(task.id) ? (
//                         <CheckCircle2 size={22} className="text-emerald-500" />
//                       ) : (
//                         <Circle
//                           size={22}
//                           className="text-gray-300 group-hover:text-indigo-400 transition-colors"
//                         />
//                       )}
//                     </button>
//                     <span
//                       className={`text-sm font-bold ${completedTasks.includes(task.id) ? "text-gray-400 line-through" : "text-gray-700"}`}
//                     >
//                       {task.title}
//                     </span>
//                   </div>
//                 </td>
//                 <td className="px-8 py-5">
//                   <span
//                     className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${getPriorityBadge(task.priority)}`}
//                   >
//                     {task?.priority || "Unknown"}
//                   </span>
//                 </td>

//                 <td className="px-8 py-5">
//                   <div className="flex items-center gap-2 text-xs font-bold text-gray-500">
//                     <Clock size={14} className="text-gray-400" />
//                     {task.dueDate
//                       ? new Date(task.dueDate).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                         })
//                       : "No Date"}
//                   </div>
//                 </td>
//                 <td className="px-8 py-5 text-center">
//                   <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-gray-200 transition-all">
//                     <ChevronRight size={16} className="text-gray-400" />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { CheckCircle2, ChevronRight, Circle, Clock } from "lucide-react";
// import axiosInstance from "../../utils/axiosInstance";

// export default function TasksAndCalendar() {
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [taskData, setTaskData] = useState([]);

//   const fetchUserTasks = async () => {
//     try {
//       const response = await axiosInstance.get("/data/tasks/me");
//       setTaskData(response.data || []);
//     } catch {}
//   };

//   useEffect(() => {
//     fetchUserTasks();
//   }, []);

//   const toggleTask = (id) => {
//     setCompletedTasks((prev) =>
//       prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
//     );
//   };

//   const getPriorityBadge = (priority) => {
//     switch (priority) {
//       case "high":
//         return "bg-red-500/10 text-red-400";
//       case "medium":
//         return "bg-amber-500/10 text-amber-400";
//       case "low":
//         return "bg-emerald-500/10 text-emerald-400";
//       default:
//         return "bg-slate-500/10 text-slate-400";
//     }
//   };

//   return (
//     <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
//       <div className="p-6 border-b border-slate-800 flex justify-between">
//         <div>
//           <h3 className="text-lg font-bold text-white">Active Tasks</h3>
//           <p className="text-sm text-slate-400">
//             {taskData.length} pending approvals
//           </p>
//         </div>
//         <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300">
//           View all
//         </button>
//       </div>

//       <table className="w-full">
//         <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
//           <tr>
//             <th className="px-6 py-4 text-left">Task</th>
//             <th className="px-6 py-4 text-left">Priority</th>
//             <th className="px-6 py-4 text-left">Due</th>
//             <th className="px-6 py-4"></th>
//           </tr>
//         </thead>

//         <tbody className="divide-y divide-slate-800">
//           {taskData.map((task) => (
//             <tr key={task.id} className="hover:bg-[#0B1220] transition">
//               <td className="px-6 py-5">
//                 <div className="flex items-center gap-4">
//                   <button onClick={() => toggleTask(task.id)}>
//                     {completedTasks.includes(task.id) ? (
//                       <CheckCircle2 className="text-emerald-400" />
//                     ) : (
//                       <Circle className="text-slate-500" />
//                     )}
//                   </button>
//                   <span
//                     className={`text-sm font-semibold ${
//                       completedTasks.includes(task.id)
//                         ? "line-through text-slate-500"
//                         : "text-slate-200"
//                     }`}
//                   >
//                     {task.title}
//                   </span>
//                 </div>
//               </td>

//               <td className="px-6 py-5">
//                 <span
//                   className={`px-3 py-1 rounded-lg text-xs font-bold ${getPriorityBadge(
//                     task.priority,
//                   )}`}
//                 >
//                   {task.priority || "Unknown"}
//                 </span>
//               </td>

//               <td className="px-6 py-5">
//                 <div className="flex items-center gap-2 text-xs text-slate-400">
//                   <Clock size={14} />
//                   {task.dueDate
//                     ? new Date(task.dueDate).toLocaleDateString("en-US", {
//                         month: "short",
//                         day: "numeric",
//                       })
//                     : "No date"}
//                 </div>
//               </td>

//               <td className="px-6 py-5 text-center">
//                 <ChevronRight className="text-slate-500" size={16} />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { CheckCircle2, Circle, Clock } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function TasksAndCalendar() {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [taskData, setTaskData] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 4;

  const fetchUserTasks = async () => {
    try {
      const response = await axiosInstance.get("/data/tasks/me");
      setTaskData(response.data || []);
    } catch {}
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
        return "bg-red-500/10 text-red-400";
      case "medium":
        return "bg-amber-500/10 text-amber-400";
      case "low":
        return "bg-emerald-500/10 text-emerald-400";
      default:
        return "bg-slate-500/10 text-slate-400";
    }
  };

  const totalPages = Math.ceil(taskData.length / ITEMS_PER_PAGE);

  const paginatedTasks = showAll
    ? taskData
    : taskData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      );

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
            setShowAll((prev) => !prev);
            setCurrentPage(1);
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
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-slate-800">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                currentPage === i + 1
                  ? "bg-indigo-600 text-white"
                  : "bg-[#0B1220] text-slate-400 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
