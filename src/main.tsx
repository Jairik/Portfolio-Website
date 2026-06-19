import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'  // Global Styling
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

console.log("What's up fellow developer!");

const root = document.getElementById('root')!
const app = (
    <StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StrictMode>
)

if (root.hasChildNodes()) {
    hydrateRoot(root, app)
} else {
    createRoot(root).render(app)
}
