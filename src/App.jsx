import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigationSidebar from './components/NavigationSidebar'
import ValuesDisplayCard from './components/ValuesDisplayCard'

import { Tabs, SimpleGrid, For } from '@chakra-ui/react'
import HeaderComponent from './components/HeaderComponent'
import LoginComponent from './components/LoginComponent'
import { Outlet } from 'react-router-dom'
import FileUploadComponent from './components/FileUploadComponent'
import Dummy from './components/Dumy'
import AdminPage from './components/AdminPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-40">
        <NavigationSidebar />
      </div>

      {/* Right side (Header + Content) */}
      <div className="flex flex-col flex-1">
        
        {/* Header */}
        <div className="h-16">
          <HeaderComponent />
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
          <Outlet />
        </div>

      </div>

    </div>

      {/* <Dummy></Dummy> */}
    </>
  )
}

export default App
