import NavigationSidebar from "./components/Layout/Sidebar";
import HeaderComponent from "./components/Layout/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-40">
          <NavigationSidebar />
        </div>
        <div className="flex flex-col flex-1">
          <div className="h-16">
            <HeaderComponent />
          </div>
          <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
