import { createRoot } from "react-dom/client";
import AppRoute from "./AppRoute";
import { BrowserRouter as Router } from "react-router-dom";
import './index.css'

createRoot(document.getElementById("root")!).render(
  <Router>
    <AppRoute />
  </Router>
);
