import { createRoot } from 'react-dom/client'
import './index.css'  // Global Styling
import { StrictMode, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const TerminalHome = lazy(() => import('./components/terminal-home/TerminalHome.tsx'));  // Terminal-styled main page
const Terminal = lazy(() => import('./components/Terminal.tsx'));  // Terminal alternate view
const SimplePortfolio = lazy(() => import('./components/SimplePortfolio.tsx'));  // Lightweight view (hidden URL, no toggle)
const Resume = lazy(() => import('./components/Resume.tsx'));  // PDF résumé viewer
const NotFound = lazy(() => import('./components/NotFound.tsx'));  // Kernel-panic 404 page

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Suspense fallback={<main className="min-h-screen bg-black" />}>
                <Routes>
                    <Route path="/" element={<TerminalHome />} />
                    <Route path="/terminal" element={<Terminal />} />
                    <Route path="/simple" element={<SimplePortfolio />} />
                    <Route path="/resume" element={<Resume />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    </StrictMode>
)
