import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import { Menu, Button, Portal } from '@chakra-ui/react'
import { Link } from "react-router-dom";

function HeaderComponent() {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setNotifications([
      {
        title: "Flexi declaration open 📢",
        description: "Flexi declaration for 2025-2026 is now open",
        time: "3 weeks ago",
        unread: true,
      },
      {
        title: "Tax regime is now open 📢",
        description: "Tax regime for 2025-2026 has been released",
        time: "3 weeks ago",
        unread: true,
      },
    ])
  }, [])

  function handleLogout(){

  }

  return (
    <header className="w-full h-16 bg-white shadow-sm flex items-center justify-between px-8">
      
      {/* Left side (empty / logo placeholder) */}
      <div className="text-lg font-semibold text-gray-700">
        {/* Logo or App Name */}
      </div>

      {/* Right side */}
      <div className="flex items-center gap-6">
        
        {/* Notification Icon */}

        <Menu.Root>
  <Menu.Trigger asChild>
    <div className="relative cursor-pointer">
      <Bell size={20} />
      {notifications.some(n => n.unread) && (
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      )}
    </div>
  </Menu.Trigger>

  <Portal>
    <Menu.Positioner>
      <Menu.Content className="outline-none">
        
        {/* Card */}
        <div className="w-[380px] bg-white rounded-xl shadow-xl border">
          
          {/* Header */}
          <div className="px-5 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-800">
              Notifications
            </h3>
          </div>

          {/* Notifications List */}
          <div className="max-h-[360px] overflow-y-auto divide-y">
            {notifications.map((n, index) => (
              <div
                key={index}
                className="flex gap-4 px-5 py-4 hover:bg-gray-50 cursor-pointer"
              >
                
                {/* Left Icon */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  📄
                </div>

                {/* Content */}
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">
                    {n.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {n.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {n.time}
                  </p>
                </div>

                {/* Unread Dot */}
                {n.unread && (
                  <div className="mt-2">
                    <span className="w-2 h-2 bg-blue-700 rounded-full block"></span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t text-center">
            <button className="text-sm font-medium text-blue-600 hover:underline">
              View All
            </button>
            <button className="text-sm font-medium text-blue-600 hover:underline">
              Clear All
            </button>
          </div>
        </div>

      </Menu.Content>
    </Menu.Positioner>
  </Portal>
</Menu.Root>


        {/* <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} /> */}
          {/* Notification dot (optional) */}
        {/* </button> */}

        {/* User Info */}
        <Menu.Root>
          <Menu.Trigger asChild>
            {/* <div variant="outline" size="sm"> */}
            <div className=" w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-semibold tracking-wide">
              AM
            </div>

            {/* </div> */}
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content>
                <Link to="/profile">
                  <Menu.Item value="profile">
                    Profile
                  </Menu.Item>
                </Link>
                
                <Link to="/settings">
                  <Menu.Item value="settings">
                    Settings
                  </Menu.Item>
                </Link>
                
                <div onClick={handleLogout}>
                  <Menu.Item value="logout">
                    Logout
                  </Menu.Item>
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
