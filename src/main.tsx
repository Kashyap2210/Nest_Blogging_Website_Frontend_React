// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BlogGrandContainer from './components/BlogGrandContainer.tsx';
import AuthProvider from './context/AuthProvider.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider>
      <BrowserRouter>
      <BlogGrandContainer />
      </BrowserRouter>
    </AuthProvider>
  // </StrictMode>
);
