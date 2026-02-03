import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Menu, Portal } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function HeaderComponent() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: "Flexi declaration open 📢",
        description: "Flexi declaration for 2025-2026 is now open",
        time: "3 weeks ago",
        unread: true,
      },
      {
        id: 2,
        title: "Tax regime is now open 📢",
        description: "Tax regime for 2025-2026 has been released",
        time: "3 weeks ago",
        unread: true,
      },
    ]);
  }, []);

  function markAllAsRead() {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  }

  function clearAll() {
    setNotifications([]);
  }

  function handleLogout() {
    console.log("Logout clicked");
  }

  return (
    <header className="w-full h-16 bg-white border-b flex items-center justify-between px-8">
      {/* Left: App Name */}
      <div className="text-lg font-semibold text-gray-700 tracking-wide">
        Darwinflow
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* 🔔 Notifications */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <div className="relative cursor-pointer p-2 rounded-full hover:bg-gray-100 transition">
              <Bell size={20} className="text-gray-600" />
              {notifications.some((n) => n.unread) && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </div>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content className="outline-none">
                <div className="w-95 bg-white rounded-xl shadow-xl border">
                  {/* Header */}
                  <div className="px-5 py-4 border-b flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Notifications
                    </h3>
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-indigo-600 hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  {/* List */}
                  <div className="max-h-90 overflow-y-auto divide-y">
                    {notifications.length === 0 && (
                      <div className="p-6 text-center text-gray-500 text-sm">
                        No notifications 🎉
                      </div>
                    )}

                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        className="flex gap-4 px-5 py-4 hover:bg-gray-50 transition cursor-pointer"
                      >
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                          📄
                        </div>

                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-800">
                            {n.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {n.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                        </div>

                        {n.unread && (
                          <span className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></span>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  {notifications.length > 0 && (
                    <div className="px-5 py-3 border-t flex justify-between text-sm">
                      <button
                        onClick={clearAll}
                        className="text-gray-500 hover:text-red-500 transition"
                      >
                        Clear All
                      </button>
                      <button className="text-indigo-600 hover:underline">
                        View All
                      </button>
                    </div>
                  )}
                </div>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>

        {/* 👤 Profile Menu */}
        <Menu.Root>
          <Menu.Trigger asChild>
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-sm font-semibold tracking-wide cursor-pointer hover:shadow-sm transition">
              AM
            </div>
          </Menu.Trigger>

          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Link to="/profile">
                  <Menu.Item value="profile">Profile</Menu.Item>
                </Link>

                <Link to="/settings">
                  <Menu.Item value="settings">Settings</Menu.Item>
                </Link>

                <Menu.Item value="logout" onClick={handleLogout}>
                  Logout
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      </div>
    </header>
  );
}

export default HeaderComponent;
