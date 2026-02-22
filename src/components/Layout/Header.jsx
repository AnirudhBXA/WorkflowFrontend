import {
  Bell,
  Settings,
  LogOut,
  User as UserIcon,
  Menu as MenuIcon,
} from "lucide-react";
import { useEffect, useState, useContext } from "react";
import { Menu, Portal } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axiosInstance from "../../utils/axiosInstance";

function HeaderComponent({ onMenuClick }) {
  const [notifications, setNotifications] = useState([]);
  const { logout, user } = useContext(AuthContext);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "Flexi declaration open",
        description: "Declaration for 2025-2026 is now live",
        time: "2h ago",
        unread: true,
      },
      {
        id: 2,
        title: "Timesheet Approved",
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

  function getProfileIcon() {
    return (
      user?.name
        ?.split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase() || ""
    );
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-[#0F172A] border-b border-slate-800 flex items-center justify-between px-4 md:px-8">
      {/* Hamburger for mobile */}
      <button
        className="md:hidden p-2 rounded-md hover:bg-[#111827] text-slate-400 hover:text-white"
        onClick={onMenuClick}
      >
        <MenuIcon size={22} />
      </button>

      <div className="flex items-center gap-5 ml-auto">
        {/* Notifications */}
        <Menu.Root unstyled>
          <Menu.Trigger asChild>
            <button className="relative p-2 rounded-xl hover:bg-[#111827] text-slate-400 hover:text-white">
              <Bell size={20} />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full"></span>
              )}
            </button>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content className="outline-none">
                <div className="w-80 bg-[#111827] rounded-2xl border border-slate-700 overflow-hidden mt-2">
                  <div className="px-5 py-4 border-b border-slate-700">
                    <h3 className="text-sm font-bold text-white">
                      Notifications
                    </h3>
                  </div>
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="px-5 py-4 hover:bg-[#0B1220] transition"
                    >
                      <p className="text-sm font-semibold text-slate-200">
                        {n.title}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {n.description}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-2">
                        {n.time}
                      </p>
                    </div>
                  ))}
                </div>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        {/* Profile dropdown */}
        <Menu.Root unstyled>
          <Menu.Trigger asChild>
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white">
                  {user?.name || "John Doe"}
                </p>
                <p className="text-[10px] text-slate-400 uppercase">
                  {user?.role || "USER"}
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                {getProfileIcon()}
              </div>
            </div>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content className="outline-none bg-transparent shadow-none">
                <div className="w-56 bg-[#111827] border border-slate-700 rounded-2xl p-2 mt-2">
                  <Link to="/profile">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-[#0B1220] rounded-xl">
                      <UserIcon size={16} /> Profile
                    </div>
                  </Link>
                  <Link to="/settings">
                    <div className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-300 hover:bg-[#0B1220] rounded-xl">
                      <Settings size={16} /> Settings
                    </div>
                  </Link>
                  <div className="h-px bg-slate-700 my-2" />
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-400 hover:bg-red-500/10 rounded-xl cursor-pointer"
                  >
                    <LogOut size={16} /> Logout
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
