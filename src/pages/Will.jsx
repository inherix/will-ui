import { useNavigate } from "react-router-dom";

export default function Will(){
    const navigate= useNavigate();
    return(
        <div>
            <button onClick={() => {
            navigate("/beneficiary/last_will/create"); }}
          className="px-8 py-2 mb-2 rounded-lg bg-accent text-black font-semibold" > Create Will</button>
        </div>
    );
}