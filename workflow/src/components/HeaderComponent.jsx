import { Bell, ChevronDown } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import { Menu, Button, Portal } from '@chakra-ui/react'

function HeaderComponent() {

  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setNotifications([
      {"message":"notification 1"},
      {"message":"notification 2"},
      {"message":"notification 3"},
      {"message":"notification 4"},
    ])
  }, [])

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
          <div variant="outline" size="sm">
            <Bell size={20} />
            {(notifications.length>0) && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-600 rounded-full"></span>
            )}
          </div>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification.message}</li>
                ) )}
              </ul>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>

        {/* <button className="relative text-gray-500 hover:text-gray-700">
          <Bell size={20} /> */}
          {/* Notification dot (optional) */}
        {/* </button> */}

        {/* User Info */}
        <div className="flex items-center gap-2 cursor-pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="user"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-gray-700">
            Raju
          </span>
          <ChevronDown size={16} className="text-gray-500" />
        </div>
      </div>
    </header>
  );
}

export default HeaderComponent;
