import NavigationSidebar from "./components/Layout/Sidebar";
import HeaderComponent from "./components/Layout/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FDFDFF]">
      {/* 1. Sidebar - Width is controlled inside the component (w-64) */}
      <NavigationSidebar />

      <div className="flex flex-col flex-1 min-w-0">
        {/* 2. Header - Height is controlled inside the component (h-20) */}
        <HeaderComponent />

        {/* 3. Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-[#FDFDFF] relative">
          {/* Optional: Add a smooth fade-in for page transitions */}
          <div className="p-8 lg:p-10 animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
