import { useState } from "react"
import {
  Leaf,
  Clock,
  FileText,
  Award,
  Monitor,
} from "lucide-react"
import { cn } from "../utils/CnMethod"

const navItems = [
  { icon: Leaf, label: "Leaves" },
  { icon: Clock, label: "Trainings" },
  { icon: FileText, label: "Timesheet" },
  { icon: Award, label: "Certifications" },
  { icon: Monitor, label: "Interviews" },
]

export default function NavigationSidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <aside className="flex h-screen w-64 flex-col bg-[#2f5db7] text-white">
      
      {/* ===== Header ===== */}
      <div className="flex flex-col items-center bg-[#1f3f8b] py-6">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white">
          <span className="text-xl font-semibold">IS</span>
        </div>

        <button
          onClick={() => setActiveItem("Dashboard")}
          className={cn(
            "w-[85%] rounded-md py-2 text-sm font-medium transition",
            activeItem === "Dashboard"
              ? "bg-[#2f5db7]"
              : "hover:bg-white/10"
          )}
        >
          Dashboard
        </button>
      </div>

      {/* ===== Navigation ===== */}
      <nav className="flex-1 py-6">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                onClick={() => setActiveItem(item.label)}
                className={cn(
                  "flex w-full items-center gap-4 px-6 py-3 text-sm transition",
                  activeItem === item.label
                    ? "bg-[#3b66c4]"
                    : "hover:bg-white/10"
                )}
              >
                <item.icon className="h-5  w-5" strokeWidth={1.5} />
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}
