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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeaderComponent></HeaderComponent>
      <NavigationSidebar></NavigationSidebar>

      <Outlet></Outlet>
    </>
  )
}

export default App
