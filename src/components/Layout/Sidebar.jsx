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
    <aside className="h-screen w-64 bg-[#FDFDFF] border-r border-indigo-50 flex flex-col shrink-0">
      {/* Branding Section */}
      <div className="p-8 flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl shadow-lg shadow-indigo-100">
          <LayoutGrid className="text-white w-5 h-5" />
        </div>
        <span className="text-xl font-black tracking-tight text-gray-900">
          DarwinFlow<span className="text-indigo-600"></span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
          Main Menu
        </p>

        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.navPath}
            className={({ isActive }) => `
              flex items-center justify-between px-4 py-3 rounded-2xl transition-all group
              ${
                isActive
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
              }
            `}
          >
            {/* IMPORTANT: We must pass isActive through the children function 
               if we want to use it for the icon strokeWidth 
            */}
            {({ isActive }) => (
              <>
                <div className="flex items-center gap-4">
                  <item.icon
                    className="h-5 w-5"
                    strokeWidth={isActive ? 2.5 : 2}
                  />
                  <span className="text-sm font-bold">{item.label}</span>
                </div>
                <ChevronRight
                  className={`h-4 w-4 transition-transform group-hover:translate-x-1 opacity-0 group-hover:opacity-100`}
                />
              </>
            )}
          </NavLink>
        ))}

        {/* Manager Exclusive Section */}
        {(user?.role === "ADMIN" || user?.role === "HR") && (
          <div className="pt-8">
            <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4">
              Admin Hub
            </p>
            <NavLink
              to="/workflows"
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-2xl transition-all
                ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                    : "text-gray-500 hover:bg-indigo-50 hover:text-indigo-600"
                }
              `}
            >
              {({ isActive }) => (
                <>
                  <Users className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-sm font-bold">Team Workflows</span>
                </>
              )}
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
}
