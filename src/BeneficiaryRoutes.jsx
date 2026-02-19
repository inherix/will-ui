import { Routes, Route } from "react-router-dom";
import Benefactor from "./pages/Beneficiary";
import AddBeneficiary from "./pages/AddBeneficiary";
import Update from "./pages/UpdateBeneficiary";
import ManageData from "./api/WillContext";
import Will from "./pages/Will";
import WillCreation from "./pages/WillCreation";

export default function BeneficiaryRoutes() {
  return (
    <ManageData>
      <Routes>
        <Route index element={<Benefactor />} />
        <Route path="add" element={<AddBeneficiary />} />
        <Route path="update/:id" element={<Update />} />
        <Route path="last_will" element={<Will />} />
        <Route path="last_will/create" element={<WillCreation />} />
      </Routes>
    </ManageData>
  );
}
