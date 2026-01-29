import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from "@chakra-ui/react";
import { system } from './theme.js';
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { Route } from 'lucide-react';
import DashboardComponent from './components/DashboardComponent.jsx';
import TimesheetsComponent from './components/TimesheetsComponent.jsx';
import LeavesComponent from './components/LeavesComponent.jsx';
import TrainingsComponent from './components/TrainingComponent.jsx';
import InterviewsComponent from './components/InterviewsComponent.jsx';
import CertificationsComponent from './components/CertificatoinComponent.jsx';
import LoginComponent from './components/LoginComponent.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ChakraProvider  value={system}>
      <div>
      <Routes>

        <Route path='/' element={<App />}></Route>
        <Route path='/dashboard' element={<DashboardComponent />}></Route>
        <Route path='/timesheet' element={<TimesheetsComponent />}></Route>
        <Route path='/leave' element={<LeavesComponent />}></Route>
        <Route path='/trainings' element={<TrainingsComponent />}></Route>
        <Route path='/interviews' element={<InterviewsComponent />}></Route>
        <Route path='/certifications' element={<CertificationsComponent />}></Route>
        <Route path='/login' element={<LoginComponent />}></Route>


      </Routes>
      </div>
    </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
