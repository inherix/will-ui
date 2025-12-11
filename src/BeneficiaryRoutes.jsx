import { Routes , Route} from "react-router-dom";
import Benefactor from "./pages/Beneficiary";
import AddBeneficiary from "./pages/AddBeneficiary";
import Update from "./pages/UpdateBeneficiary";
import ManageData from "./api/WillContext";

export default function BeneficiaryRoutes(){
    return(
        <ManageData>
        <Routes>
            <Route index element={<Benefactor />} />
            <Route path="beneficiary" element={<Benefactor />} />
            <Route path="add" element={<AddBeneficiary />} />
            <Route path="update/:id" element={<Update />} />
        </Routes>
         </ManageData>
    );
}