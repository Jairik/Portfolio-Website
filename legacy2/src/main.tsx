import { createRoot } from 'react-dom/client'
import './index.css'  // Global Styling
import { StrictMode, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const App = lazy(() => import('./App.tsx'));  // Main Application Component
const Terminal = lazy(() => import('./components/Terminal.tsx'));  // Terminal alternate view
const NotFound = lazy(() => import('./components/NotFound.tsx'));  // Kernel-panic 404 page

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Suspense fallback={<main className="min-h-screen bg-black" />}>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/terminal" element={<Terminal />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    </StrictMode>
)
