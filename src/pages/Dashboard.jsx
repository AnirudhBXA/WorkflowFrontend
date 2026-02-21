// import StatsCards from "../components/Dashboard/StatsCards";
// import ChartsSection from "../components/Dashboard/ChartSection";
// import TasksAndCalendar from "../components/Dashboard/TasksAndCalendar";

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-[#FDFDFF] text-gray-900 pb-12">
//       <div className="absolute top-0 left-0 w-full h-64 bg-linear-to-b from-indigo-50/50 to-transparent pointer-events-none" />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 relative z-10">
//         <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
//           <div>
//             <h1 className="text-3xl font-black tracking-tight text-gray-900">
//               Workspace <span className="text-indigo-600">Overview</span>
//             </h1>
//             <p className="text-gray-500 font-medium mt-1">
//               Welcome back. Here is what's happening with your projects today.
//             </p>
//           </div>
//           <div className="flex gap-3">
//             <button className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 transition-all">
//               Download Report
//             </button>
//           </div>
//         </div>

//         <div className="space-y-8">
//           <StatsCards />
//           <ChartsSection />
//           <TasksAndCalendar />
//         </div>
//       </div>
//     </div>
//   );
// }

import StatsCards from "../components/Dashboard/StatsCards";
import ChartsSection from "../components/Dashboard/ChartSection";
import TasksAndCalendar from "../components/Dashboard/TasksAndCalendar";
import { Download } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-slate-400 mt-1">
              Monitor workflows, approvals and activity
            </p>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-xl bg-slate-800 border border-slate-700 hover:bg-slate-700 transition">
              <Download size={16} />
              Export data
            </button>
          </div>
        </div>

        <div className="space-y-10">
          <StatsCards />
          <ChartsSection />
          <TasksAndCalendar />
        </div>
      </div>
    </div>
  );
}
