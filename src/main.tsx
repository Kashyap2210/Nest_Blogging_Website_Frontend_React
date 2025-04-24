// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import BlogGrandContainer from "./components/BlogGrandContainer.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import "./index.css";
import { store } from "./redux/store.ts";
import Navbar from "./components/Navbar.tsx";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
      <Navbar />
        <BlogGrandContainer />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
  // </StrictMode>
);
