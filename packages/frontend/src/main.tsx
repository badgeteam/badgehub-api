import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";
import AppDetail from "./components/AppDetailPage/AppDetail.tsx";

import { SessionProvider } from "@components/keycloakSession/SessionProvider.tsx";
import { TodoPage } from "@pages/TodoPage.tsx";

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
      <SessionProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/page/app/:slug" element={<AppDetailWrapper />} />
          <Route path="/page/todo" element={<TodoPage />} />
        </Routes>
      </SessionProvider>
    </BrowserRouter>
  </StrictMode>
);

// Floating toggle button logic
function setupTodoToggleButton() {
  const btn = document.createElement("button");
  btn.className = "todo-toggle-btn";
  btn.title = "Toggle TODO overlay";
  btn.innerHTML = "🟧";
  let enabled = false;

  const rootDiv = document.getElementById("root");
  function updateRootClass() {
    if (!rootDiv) return;
    if (enabled) {
      rootDiv.classList.add("todoOverlayEnabled");
    } else {
      rootDiv.classList.remove("todoOverlayEnabled");
    }
    btn.style.opacity = enabled ? "1" : "0.6";
  }

  btn.onclick = () => {
    enabled = !enabled;
    updateRootClass();
  };

  document.body.appendChild(btn);
  updateRootClass();
}

setupTodoToggleButton();
