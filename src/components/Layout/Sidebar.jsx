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

export default function NavigationSidebar({ className = "" }) {
  const { user } = useContext(AuthContext);

  return (
    <aside
      className={`h-full w-64 bg-[#0F172A] border-r border-slate-800 flex flex-col ${className}`}
      aria-label="Primary"
    >
      <div className="px-6 py-6 flex items-center gap-3 shrink-0">
        <div className="bg-indigo-600 p-2 rounded-xl">
          <LayoutGrid className="text-white w-5 h-5" />
        </div>
        <span className="text-lg font-extrabold text-white tracking-tight">
          DarwinFlow
        </span>
      </div>

      <nav className="flex-1 px-2 space-y-2 overflow-y-auto">
        <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-2 mb-2">
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
