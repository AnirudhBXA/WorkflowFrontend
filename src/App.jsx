import NavigationSidebar from "./components/Layout/Sidebar";
import HeaderComponent from "./components/Layout/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div className="flex h-screen overflow-hidden bg-[#FDFDFF]">
      <NavigationSidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <HeaderComponent />
        <main className="flex-1 overflow-y-auto bg-[#FDFDFF] relative">
          <div className="p-8 lg:p-10 animate-in fade-in duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
