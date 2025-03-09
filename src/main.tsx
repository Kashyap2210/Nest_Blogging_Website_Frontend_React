// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import BlogGrandContainer from "./components/BlogGrandContainer.tsx";
import AuthProvider from "./context/AuthProvider.tsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { store } from "./redux/store.ts";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>

  <AuthProvider>
    <BrowserRouter>
      <Provider store={store}>
        <BlogGrandContainer />
      </Provider>
    </BrowserRouter>
  </AuthProvider>
  // </StrictMode>
);
