import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavigationSidebar from './components/NavigationSidebar'
import ValuesDisplayCard from './components/ValuesDisplayCard'

import { Tabs, SimpleGrid, For } from '@chakra-ui/react'
import HeaderComponent from './components/HeaderComponent'
import LoginComponent from './components/LoginComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <HeaderComponent></HeaderComponent>
      <NavigationSidebar></NavigationSidebar>

      <div>
        <ValuesDisplayCard context="time left" color="red" value="5" units="days"></ValuesDisplayCard>
      </div>

      {/* ["line", "subtle", "enclosed", "outline", "plain"] */}

      <SimpleGrid columns={2} gap="14" width="full">
          <Tabs.Root key="outline" defaultValue="members" variant="outline">
            <Tabs.List>
              <Tabs.Trigger value="members">
                Members
              </Tabs.Trigger>
              <Tabs.Trigger value="projects">
                Projects
              </Tabs.Trigger>
              <Tabs.Trigger value="tasks">
                Settings
              </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content value="members">
              Manage your team members
            </Tabs.Content>

            <Tabs.Content value="projects">
              Manage your projects
            </Tabs.Content>
            
            <Tabs.Content value="tasks">
              Manage your tasks for freelancers
            </Tabs.Content>
          </Tabs.Root>
    </SimpleGrid>

      <LoginComponent></LoginComponent>
    </>
  )
}

export default App
