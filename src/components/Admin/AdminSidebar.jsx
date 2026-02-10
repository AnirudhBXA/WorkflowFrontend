import { Building2, Users, ChevronRight, Briefcase } from "lucide-react";

export default function AdminSidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: "users", label: "User Registry", icon: Users },
    { id: "departments", label: "Departments", icon: Building2 },
    { id: "employees", label: "Employee Data", icon: Briefcase },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-400 flex flex-col border-r border-slate-800 h-screen sticky top-0">
      <div className="p-8 flex items-center gap-3 border-b border-slate-900">
        <span className="font-bold text-lg lowercase tracking-[0.15em] text-white">
          darwinflow
        </span>
      </div>

      <nav className="flex-1 px-3 py-6 space-y-1">
        <p className="px-4 text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] mb-4">
          Administration
        </p>

        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-4 py-3 text-sm font-semibold rounded transition-all ${
              activeTab === item.id
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/40"
                : "hover:bg-slate-900 hover:text-slate-100"
            }`}
          >
            <div className="flex items-center gap-3">
              <item.icon
                size={18}
                strokeWidth={activeTab === item.id ? 2.5 : 2}
              />
              {item.label}
            </div>
            {activeTab === item.id && <ChevronRight size={14} />}
          </button>
        ))}
      </nav>
    </aside>
  );
}
