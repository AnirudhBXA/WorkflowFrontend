import { Leaf, Clock, FileText, Award, Monitor } from "lucide-react";
import { cn } from "../../utils/cn";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const navItems = [
  { icon: Monitor, label: "Dashboard", navPath: "/dashboard" },
  { icon: Leaf, label: "Leaves", navPath: "/leave" },
  { icon: Clock, label: "Trainings", navPath: "/trainings" },
  { icon: FileText, label: "Timesheet", navPath: "/timesheet" },
  { icon: Award, label: "Certifications", navPath: "/certifications" },
  { icon: Monitor, label: "Interviews", navPath: "/interviews" },
  // { icon: FileText, label: "Work flows", navPath: "/workflows" },
];

export default function NavigationSidebar() {

  const { user } = useContext(AuthContext);

  return (
    <aside className="flex h-screen w-40 flex-col bg-[#2f5db7] text-white">
      {/* ===== Header ===== */}
      <div className="flex flex-col items-center bg-[#1f3f8b] py-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white">
          <span className="text-xl font-semibold">IS</span>
        </div>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <NavLink
                to={item.navPath}
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#1f3f8b" : "transparent",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  borderRadius: "8px",
                })}
                className={cn(
                  "flex w-full items-center gap-4 px-6 py-3 text-sm transition",
                )}
              >
                <item.icon className="h-5  w-5" strokeWidth={1.5} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}

          {(user?.role === "MANAGER" || user?.role === "HR") && (
            <li key="workflow">
              <NavLink
                to="/workflows"
                style={({ isActive }) => ({
                  backgroundColor: isActive ? "#1f3f8b" : "transparent",
                  color: isActive ? "#ffffff" : "#cbd5e1",
                  borderRadius: "8px",
                })}
                className={cn(
                  "flex w-full items-center gap-4 px-6 py-3 text-sm transition",
                )}
              >
                <FileText className="h-5  w-5" strokeWidth={1.5} />
                <span>Workflows</span>
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
}
