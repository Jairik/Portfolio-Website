import { createRoot } from 'react-dom/client'
import './index.css'  // Global Styling
import { StrictMode, lazy, Suspense } from 'react'

const App = lazy(() => import('./App.tsx'));  // Main Application Component

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Suspense fallback={<main className="min-h-screen bg-black" />}>
            <App />
        </Suspense>
    </StrictMode>
)
