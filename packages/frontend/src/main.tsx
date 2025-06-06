import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import "./index.css";
import App from "./App.tsx";
import AppDetail from "./components/AppDetail";

const AppDetailWrapper = () => {
  const { slug } = useParams<{ slug: string }>();
  if (!slug) {
    return <div>Error: App slug is required</div>;
  }
  return <AppDetail slug={slug} />;
};
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/app/:slug" element={<AppDetailWrapper />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
