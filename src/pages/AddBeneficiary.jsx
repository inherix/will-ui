import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBeneficiaries } from "../api/WillContext";
import axios from "axios";

export default function AddBeneficiary() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();
  const { beneficiary, setBeneficiaries, loading } = useBeneficiaries();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    DoB: "",
    relation: "",
  });

  function handleChange(e) {
    setForm((form) => ({ ...form, [e.target.name]: e.target.value }));
  }

  const addBenefactor = async () => {
    try {
      if (
        !form.firstName.trim() ||
        !form.lastName.trim() ||
        !form.DoB.trim() ||
        !form.email.trim()
      ) {
        setError("Please fill every field in the form!!!");
        return null;
      }

      const request = await axios.post(
       `${API}/api/add/beneficiary`,
        form,
      );
      setBeneficiaries((beneficiary) => [...beneficiary, request.data]);
      setError("");
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        DoB: "",
        mobile: "",
        relation: "",
      });
      setMessage("Beneficiary added successfully!");
      setTimeout(() => {
        navigate("/beneficiary");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
        <div className="mb-4 border-b-[3px]">
          <h1 className="text-xl font-bold">Add Beneficiaries</h1>
          {message && <p className="text-accent font-semibold">{message}</p>}
        </div>
        <div className="max-w-9/10 border-indigo-600 rounded-lg m-auto shadow-md shadow-indigo-500/50 px-4 py-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            <div>
              <label className="block text-sm font-medium mb-1">
                First Name: &nbsp;
              </label>
              <input
                className="border w-full px-2 py-1 rounded-bg"
                size={30}
                type="text"
                value={form.firstName}
                name="firstName"
                placeholder="Enter your firstname"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <input
                className="border w-full px-2 py-1 rounded-bg"
                type="text"
                size={30}
                value={form.lastName}
                name="lastName"
                placeholder="Enter your lastname"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                className="border px-2 py-1 w-full rounded-bg"
                type="email"
                size={30}
                value={form.email}
                name="email"
                placeholder="Enter your email"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Date of Birth
              </label>
              <input
                className="border w-full px-2 py-1 rounded-bg"
                type="date"
                name="DoB"
                size={30}
                value={form.DoB}
                required
                placeholder="DOB"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Mobile</label>
              <input
                className="border w-full px-2 py-1 rounded-bg"
                type="text"
                name="mobile"
                size={30}
                value={form.mobile}
                required
                placeholder="Enter Mobile Number"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Relationship
              </label>
              <input
                className="border w-full px-2 py-1 rounded-bg"
                type="text"
                name="relation"
                size={30}
                value={form.relation}
                required
                placeholder="Relationship"
                onChange={handleChange}
              />
            </div>
            {error && <p className="text-red-600">{error}</p>}
          </div>
          <button
            onClick={addBenefactor}
            className="text-sm bg-accent text-black mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
          >
            Add
          </button>
          <button
            onClick={() => {
              navigate("/beneficiary");
            }}
            className="text-sm bg-primary mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
          >
            Cancel
          </button>
        </div>
      </div>
    
  );
}
