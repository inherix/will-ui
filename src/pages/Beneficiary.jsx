import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useBeneficiaries } from "../api/WillContext";
import axios from "axios";
export default function Benefactor() {
  const navigate = useNavigate();

  const [error, setError] = useState("");

  // const {beneficiary, setbeneficiaries}=useBeneficiaries();
  const { beneficiary, setBeneficiaries, loading, setLoading } =
    useBeneficiaries();
  const delBenefactor = async (id) => {
    try {
      setError("");
      await axios.delete(`${API}/api/delete/beneficiary/${id}`);
      setBeneficiaries((prev) => prev.filter((b) => b.Id !== id));
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div>
        <div className="flex items-center justify-between mb-4 border-b-[2px]">
          <h1 className="text-2xl font-bold">Manage Beneficiaries</h1>

          <button
            onClick={() => {
              navigate("/beneficiary/add");
            }}
            className="px-8 py-2 mb-2 rounded-lg bg-accent text-black font-semibold"
          >
            Add
          </button>
        </div>

        <div className="max-w-9/10 border-indigo-600 rounded-lg m-auto shadow-md shadow-indigo-500/50 px-4 pt-0 pb-8">
          <div className="overflow-x-auto sm:overflow-x-hidden">
            <table className="min-w-max w-full sm:border mt-4 mx-auto max-w-full">
              <caption className="text-black font-bold text-2xl mb-4">
                Beneficiaries
              </caption>
              <thead>
                <tr className="border">
                  <th className="text-center px-2">First Name</th>
                  <th className="text-centerr px-2">Last Name</th>
                  <th className="text-centerr px-2">Email</th>
                  <th className="text-centerr px-2">Date of Birth</th>
                  <th className="text-centerr px-2">Mobile</th>
                  <th className="text-centerr px-2">Relationship</th>
                </tr>
              </thead>
              <tbody>
                {beneficiary.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-4">
                      No beneficiary yet
                    </td>
                  </tr>
                ) : (
                  beneficiary.map((b) => {
                    return (
                      <tr className="border" key={b.Id}>
                        <td className="text-center  px-2">{b.firstName}</td>
                        <td className="text-center  px-2">{b.lastName}</td>
                        <td className="text-center px-2">{b.email}</td>
                        <td className="text-center  px-2">{b.DoB}</td>
                        <td className="text-center  px-2">{b.mobile}</td>
                        <td className="text-center  px-2">{b.relation}</td>
                        <td>
                          <button
                            onClick={() => delBenefactor(b.Id)}
                            className="text-sm bg-primary px-2 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
                          >
                            {" "}
                            <FontAwesomeIcon
                              icon={faTrash}
                              className="text-white text-lg"
                            />
                          </button>
                          <button
                            onClick={() => {
                              navigate(`/beneficiary/update/${b.Id}`);
                            }}
                            className="text-sm bg-black ml-4 px-2 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
                          >
                            <FontAwesomeIcon
                              icon={faPenToSquare}
                              className="text-white text-lg"
                            />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      
    </div>
  );
}
