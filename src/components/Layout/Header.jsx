import {
  Bell,
  Search,
  Settings,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { Menu, Portal } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

function HeaderComponent() {
  const [notifications, setNotifications] = useState([]);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    // Mock data for styling
    setNotifications([
      {
        id: 1,
        title: "Flexi declaration open 📢",
        description: "Declaration for 2025-2026 is now live",
        time: "2h ago",
        unread: true,
      },
      {
        id: 2,
        title: "Timesheet Approved ✅",
        description: "Your manager approved last week's entries",
        time: "5h ago",
        unread: false,
      },
    ]);
  }, []);

  function handleLogout() {
    axiosInstance.post("/auth/logout");
    logout();
  }

  return (
    <header className="sticky top-0 z-50 w-full h-20 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-10">
      {/* Left: Search Bar (New) */}
      <div className="hidden md:flex items-center relative w-72">
        <Search className="absolute left-3 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Quick search..."
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/10 transition-all"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* 🔔 Notifications */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <button className="relative p-2.5 rounded-xl hover:bg-indigo-50 text-gray-500 hover:text-indigo-600 transition-all">
              <Bell size={22} strokeWidth={2} />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-indigo-600 border-2 border-white rounded-full"></span>
              )}
            </button>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content className="outline-none z-60">
                <div className="w-80 bg-white rounded-2xl shadow-2xl border border-indigo-50 overflow-hidden mt-2">
                  <div className="px-6 py-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-900">
                      Activity
                    </h3>
                    <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:text-indigo-700">
                      Mark Read
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="p-5 hover:bg-indigo-50/30 transition-colors cursor-pointer border-b border-gray-50 last:border-0 flex gap-4"
                      >
                        <div
                          className={`w-2 h-2 mt-2 rounded-full shrink-0 ${n.unread ? "bg-indigo-600" : "bg-transparent"}`}
                        />
                        <div>
                          <p className="text-sm font-bold text-gray-800 leading-tight">
                            {n.title}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {n.description}
                          </p>
                          <p className="text-[10px] font-medium text-gray-400 mt-2">
                            {n.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        {/* Divider */}
        <div className="h-8 w-px bg-gray-100 mx-2" />

        {/* 👤 Profile Menu */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <div className="flex items-center gap-3 pl-2 cursor-pointer group">
              <div className="flex flex-col items-end sm:flex">
                <p className="text-sm font-bold text-gray-900 leading-none">
                  Aryan Mehra
                </p>
                <p className="text-[10px] font-bold text-indigo-500 uppercase tracking-tight mt-1">
                  Engineer
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-black shadow-lg shadow-indigo-100 group-hover:scale-105 transition-transform">
                AM
              </div>
            </div>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content className="outline-none">
                <div className="w-56 bg-white rounded-2xl shadow-2xl border border-indigo-50 p-2 mt-2">
                  <Link to="/profile">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-xl transition-colors">
                      <UserIcon size={18} className="text-gray-400" /> Profile
                    </div>
                  </Link>
                  <Link to="/settings">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-xl transition-colors">
                      <Settings size={18} className="text-gray-400" /> Settings
                    </div>
                  </Link>
                  <div className="h-px bg-gray-50 my-2" />
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <LogOut size={18} /> Logout
                  </div>
                </div>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>
    </header>
  );
}

export default HeaderComponent;
