import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ManageData from "./api/WillContext.jsx";
import BeneficiaryRoutes from "./BeneficiaryRoutes.jsx";
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <BeneficiaryRoutes />
  </BrowserRouter>,
);
