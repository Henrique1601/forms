import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter, Routes,Route} from "react-router-dom"
import SingUp from './components/SingUp'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>}/>
      <Route path="/SingUp" element={<SingUp/>}/>
      <Route path="/Login" element={<Login/>}/>
      <Route path='/Dashboard' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  </StrictMode>
)
