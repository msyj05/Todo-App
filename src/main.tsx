import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      richColors
      position="top-center"
      expand={true}
      toastOptions={{
        style: {
          background: 'var(--color-surface)',
          border: '1px solid var(--color-rule)',
          color: 'var(--color-ink)',
        },
      }}
    />
  </StrictMode>,
)