import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBeneficiaries } from "../api/WillContext";
export default function WillCreation(){
  const [form, setForm]=useState(  {
      willname:"",
      address:"",
      contact:"",
      beneficiary:{
        firstName:"",
        relation:"",
        share:0
      },
      description:""
    });
    const { beneficiary, setBeneficiaries, loading, setLoading } =
        useBeneficiaries();

 

  const handleChange=(e)=>
  {
    setForm(form=>({...form, [e.target.name]:e.target.value}));
  }
  
  const generatepdf = async () =>{
    const pdfBeneficiaries = beneficiary.map(b => ({
    firstName: b.firstName,
    lastName: b.lastName,
    relation: b.relation,
    share: b.share
  }));

  const payload = {
    willname: form.willname,
    address: form.address,
    contact: form.contact,
    description: form.description,
    beneficiaries: pdfBeneficiaries
  };

  await axios.put(`${API}/api/generate/pdf`, payload);

    
  }
  const addBen= async ()=>{
     const { beneficiary, setBeneficiaries, loading, setLoading } =
        useBeneficiaries();
  }

 
    const navigate=useNavigate();
    return(
        <div>
            <label className="block text-sm font-medium mb-1">
              Will Name: &nbsp;
            </label>
            <input type="text" placeholder="Name of the Will" 
            className="border w-full px-2 py-1 rounded-bg"
            size={30}
            id="willname"
            value={form.willname}
            name="willname"
            onChange={handleChange}
            required />
            <label className="block text-sm font-medium mb-1">
              Address: &nbsp;
            </label>
            <input type="text" placeholder="Address" 
            className="border w-full px-2 py-1 rounded-bg"
            size={30}
            id="state"
            value={form.address}
            name="address"
            onChange={handleChange}
            required />
            <label className="block text-sm font-medium mb-1">
              Contact: &nbsp;
            </label>
            <input type="text" placeholder="Contact" 
            className="border w-full px-2 py-1 rounded-bg"
            size={30}
            id="county"
            onChange={handleChange}
            value={form.contact}
            name="contact"
            required />
            <label className="block text-sm font-medium mb-1">
              Description: &nbsp;
            </label>
            <textarea placeholder="Description" 
            className="border w-full px-2 py-1 rounded-bg"
            name="description"
            value={form.description}
            onChange={handleChange}
            id="description"
            rows={4}
            cols={50}
            required />
             <label className="block text-sm font-medium mb-1">
              Today's Date
            </label>
            <input
              className="border w-full px-2 py-1 rounded-bg"
              type="date"
              name="date"
              size={30}
              required
              placeholder="date"
            />
             <div className="max-w-9/10 border-indigo-600 rounded-lg m-auto shadow-md shadow-indigo-500/50 px-4 pt-0 pb-8">
        <div className="overflow-x-auto sm:overflow-x-hidden">
          <table className="min-w-max w-full sm:border mt-4 mx-auto max-w-full">
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
                      </tr>
                  );
                })
              )}
                      </tbody>
                      </table>

                    </div>
                    </div>

            <div className="flex items-start gap-2">
            <input type="checkbox" name="declaration" id="declaration" className="mt-1" required/>
            <label className="text-sm font-medium mb-1 leading-relaxed">
                I confirm I am of sound mind and acting voluntarily, hereby declare this document to be
                 my Last Will and Testament, and I revoke all prior wills and testamentary documents made by me.
            </label>
            </div>
            <button onClick={addBen} 
                      className="text-sm bg-accent text-black mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black" > Add Beneficiaries </button>

            <button onClick={generatepdf}
          className="text-sm bg-accent text-black mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black" > Create </button>
          <button onClick={()=>{
            navigate("/beneficiary/last_will");
          }} className="text-sm bg-primary mt-4 mr-4 px-8 py-2 rounded-lg font-semibold text-white hover:shadow shadow-black">Cancel</button>
          
        </div>
    );
}