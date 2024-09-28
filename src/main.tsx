import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { IntervalProvider } from './contexts/IntervalContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <IntervalProvider>
    <App />
    </IntervalProvider>
  </StrictMode>,
)
