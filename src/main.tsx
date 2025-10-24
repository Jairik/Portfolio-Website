import { createRoot } from 'react-dom/client'
import './index.css'  // Global Styling
import App from './App.tsx'  // Main Application Component
import Test from './Test.tsx'  // Test Component
import { StrictMode } from 'react'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <App />
    </StrictMode>
)
