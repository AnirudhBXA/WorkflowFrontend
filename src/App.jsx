import NavigationSidebar from "./components/Layout/Sidebar";
import HeaderComponent from "./components/Layout/Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#0B1220]">
      <div className="hidden md:flex md:w-64 md:shrink-0">
        <NavigationSidebar />
      </div>

      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transform bg-[#111827] transition-transform duration-300 ease-in-out md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <NavigationSidebar />
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <HeaderComponent onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto bg-[#0B1220]">
          <div className="px-4 sm:px-6 md:px-8 py-4 md:py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
