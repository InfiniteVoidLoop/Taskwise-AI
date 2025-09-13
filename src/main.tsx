import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {SignUpPage} from './pages/SignUpPage.tsx';
import {LogInPage} from './pages/LogInPage.tsx';

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
