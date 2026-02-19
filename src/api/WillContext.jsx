import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { createContext } from "react";

const WillContext = createContext();
export default function ManageData({ children }) {
  const API = import.meta.env.VITE_API_BASE_URL;
  const [beneficiary, setBeneficiaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    try {
      setError("");
      const response = await axios.get(`${API}/api/get_all/beneficiary`);
      setBeneficiaries(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const contextValues = {
    beneficiary,
    setBeneficiaries,
    loading,
    error,
    setLoading,
  };

  return (
    <WillContext.Provider value={contextValues}>
      {children}
    </WillContext.Provider>
  );
}

export function useBeneficiaries() {
  return useContext(WillContext);
}
