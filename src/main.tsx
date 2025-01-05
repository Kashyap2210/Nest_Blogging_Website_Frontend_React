import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import BlogGrandContainer from './components/BlogGrandContainer.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlogGrandContainer />
  </StrictMode>
);
