import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useBeneficiaries } from "../api/WillContext";
import axios from "axios";
import { faL } from "@fortawesome/free-solid-svg-icons";

export default function Update() {
  const API = import.meta.env.VITE_API_BASE_URL;
  const { beneficiary, setBeneficiaries, loading, setLoading } =
    useBeneficiaries();

  const navigate = useNavigate();
  const [isChanged, setIsChanged] = useState(false);
  const [msg, setMsg] = useState("");
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    DoB: "",
    relation: "",
  });
  var isProcessing = false;
  const { id } = useParams();
  const fetchData = () => {
    if (!isProcessing) {
      isProcessing = true;
      const response = axios.get(`${API}/api/get/beneficiary/${id}`);
      response.then((res) => {
        setUser(res.data);
        isProcessing = false;
      });
    }
  };
  useEffect(fetchData, [id]);

  function handleChange(e) {
    setIsChanged(true);
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  const updateBenefactor = async () => {
    const response = await axios.put(
      `${API}/api/update/beneficiary/${id}`,
      user,
    );
    setBeneficiaries((prev) =>
      prev.map((b) => (b.Id === id ? response.data : b)),
    );
    setMsg("Form updated Successfully!!!");
    setTimeout(() => {
      navigate("/beneficiary");
    }, 1000);
  };

  return (
    <div>
      <div className="mb-2">
        {msg && (
          <p className="text-green-700 font-semibold text-center">{msg}</p>
        )}
      </div>
      <div className=" mb-8 border-b-[2px]">
        <h1 className="text-2xl font-bold">Update Beneficiaries</h1>
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
              value={user.firstName}
              name="firstName"
              placeholder="Enter your firstname"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              className="border w-full px-2 py-1 rounded-bg"
              type="text"
              size={30}
              value={user.lastName}
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
              value={user.email}
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
              value={user.DoB}
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
              value={user.mobile}
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
              value={user.relation}
              required
              placeholder="Relationship"
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          onClick={updateBenefactor}
          disabled={!isChanged}
          className={
            isChanged
              ? "text-sm bg-black mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
              : "text-sm bg-black opacity-50 mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
          }
        >
          Update
        </button>
        <button
          onClick={() => {
            navigate("/beneficiary");
          }}
          className=" text-sm bg-primary mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
