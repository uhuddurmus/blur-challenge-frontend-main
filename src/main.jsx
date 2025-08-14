import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import { EnterprisesProvider } from "./contexts/EnterprisesContext";
import Enterprises from "./routes/Enterprises";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <EnterprisesProvider>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/enterprises" element={<Enterprises />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <ToastContainer position="top-right" autoClose={3000} />
            </EnterprisesProvider>
        </BrowserRouter>
    </StrictMode>,
)
