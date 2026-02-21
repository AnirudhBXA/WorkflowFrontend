// import {
//   LayoutGrid,
//   Calendar,
//   BookOpen,
//   Clock,
//   Award,
//   Users,
//   ChevronRight,
// } from "lucide-react";
// import { NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthContext";

// const navItems = [
//   { icon: LayoutGrid, label: "Dashboard", navPath: "/dashboard" },
//   { icon: Calendar, label: "Leaves", navPath: "/leave" },
//   { icon: BookOpen, label: "Trainings", navPath: "/trainings" },
//   { icon: Clock, label: "Timesheet", navPath: "/timesheet" },
//   { icon: Award, label: "Certifications", navPath: "/certifications" },
//   { icon: Users, label: "Interviews", navPath: "/interviews" },
// ];

// export default function NavigationSidebar() {
//   const { user } = useContext(AuthContext);

//   return (
//     <aside className="h-screen w-64 bg-[#FDFDFF] border-r-2 border-blue-950 flex flex-col shrink-0">
//       {/* Branding Section */}
//       <div className="p-8 flex items-center gap-3">
//         <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
//           <LayoutGrid className="text-white w-5 h-5" />
//         </div>
//         <span className="text-xl font-black tracking-tight text-gray-900">
//           DarwinFlow<span className="text-indigo-600"></span>
//         </span>
//       </div>

//       {/* Navigation Links */}
//       <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
//         <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
//           Main Menu
//         </p>

//         {navItems.map((item) => (
//           <NavLink
//             key={item.label}
//             to={item.navPath}
//             className={({ isActive }) => `
//               flex items-center justify-between px-4 py-3 rounded-2xl transition-all group
//               ${
//                 isActive
//                   ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
//                   : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
//               }
//             `}
//           >
//             {/* IMPORTANT: We must pass isActive through the children function
//                if we want to use it for the icon strokeWidth
//             */}
//             {({ isActive }) => (
//               <>
//                 <div className="flex items-center gap-4">
//                   <item.icon
//                     className="h-5 w-5"
//                     strokeWidth={isActive ? 2.5 : 2}
//                   />
//                   <span className="text-sm font-bold">{item.label}</span>
//                 </div>
//                 <ChevronRight
//                   className={`h-4 w-4 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100`}
//                 />
//               </>
//             )}
//           </NavLink>
//         ))}

//         {/* Manager Exclusive Section */}
//         {(user?.role === "ADMIN" || user?.role === "HR") && (
//           <div className="pt-8">
//             <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
//               Admin Hub
//             </p>
//             <NavLink
//               to="/workflows"
//               className={({ isActive }) => `
//                 flex items-center gap-4 px-4 py-3 rounded-2xl transition-all
//                 ${
//                   isActive
//                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
//                     : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
//                 }
//               `}
//             >
//               {({ isActive }) => (
//                 <>
//                   <Users className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
//                   <span className="text-sm font-bold">Team Workflows</span>
//                 </>
//               )}
//             </NavLink>
//           </div>
//         )}
//       </nav>
//     </aside>
//   );
// }

import {
  LayoutGrid,
  Calendar,
  BookOpen,
  Clock,
  Award,
  Users,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
  { icon: LayoutGrid, label: "Dashboard", navPath: "/dashboard" },
  { icon: Calendar, label: "Leaves", navPath: "/leave" },
  { icon: BookOpen, label: "Trainings", navPath: "/trainings" },
  { icon: Clock, label: "Timesheet", navPath: "/timesheet" },
  { icon: Award, label: "Certifications", navPath: "/certifications" },
  { icon: Users, label: "Interviews", navPath: "/interviews" },
];

export default function NavigationSidebar() {
  const { user } = useContext(AuthContext);

  return (
    <aside className="h-screen w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col">
      <div className="px-6 py-6 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <LayoutGrid className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-extrabold text-white tracking-tight">
          DarwinFlow
        </span>
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
          Main
        </p>

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.navPath}
            className={({ isActive }) =>
              `group flex items-center justify-between px-4 py-3 rounded-xl transition
              ${
                isActive
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:bg-[#111827] hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-3">
                  <item.icon
                    className="h-5 w-5"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-sm font-semibold">{item.label}</span>
                </div>
                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition" />
              </>
            )}
          </NavLink>
        ))}

        {(user?.role === "ADMIN" || user?.role === "HR") && (
          <div className="pt-6">
            <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-4">
              Admin
            </p>

            <NavLink
              to="/workflows"
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition
                ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : "text-slate-400 hover:bg-[#111827] hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Users className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm font-semibold">Team Workflows</span>
                </>
              )}
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}
