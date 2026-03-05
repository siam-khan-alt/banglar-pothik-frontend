import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router.jsx';
import { LanguageProvider } from './context/LanguageContext.jsx';
import AuthProvider from './context/AuthProvider.jsx';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <LanguageProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </LanguageProvider>
    </AuthProvider>
  </StrictMode>,
)
