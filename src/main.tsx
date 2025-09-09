import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,  
)


/*
* Left panel: date, unfinished, All finished 
-  Calendar -> rates of finished things  red and green as marked
-  Main display -> google calendar style : percentage marked finish, work, entertainment, health, others
-  Right panel: list things, able to tick to
- npm install @mui/material @emotion/react @emotion/styled
*/