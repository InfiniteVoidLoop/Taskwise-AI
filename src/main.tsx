import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {LogInPage} from './pages/LoginPage.tsx';
import {SignUpPage} from './pages/SignUpPage.tsx';

import './index.css'
import App from './App.tsx'

const router = createBrowserRouter([
  {
    path: 'login',
    element: <LogInPage/>
  },
  {
    path: '',
    element: <App/>
  }, 
  {
    path: 'signup',
    element: <SignUpPage/>
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,  
)


/*
* Left panel: date, unfinished, All finished 
-  Calendar -> rates of finished things  red and green as marked
-  Main display -> google calendar style : percentage marked finish, work, entertainment, health, others
-  Right panel: list things, able to tick to
- npm install @mui/material @emotion/react @emotion/styled
*/