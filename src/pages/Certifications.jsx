import { useContext, useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import CertificationApprovalComponent from "../components/Certifications/CertificationApproval";
import CertificationBriefCard from "../components/Certifications/CertificationBriefCard"; // Import the modal
import { History, Plus } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

export default function CertificationsComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myCerts, setMyCerts] = useState([]);
  const [summary, setSummary] = useState({ left: 0, used: 0 });

  // States for Approval Workflow
  const [pendingItems, setPendingItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    
    fetchMyCertificates();

    fetchMySummary();

    if(user.role === "MANAGER"){
      fetchTeamCertificates();
    }

  }, []);

  async function fetchMyCertificates(){
    try{
      const response = await axiosInstance.get("/certifications/me");
      setMyCerts(response.data);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }

  async function fetchMySummary(){
    try{
      const response = await axiosInstance.get("/certifications/mySummary");
      setSummary(response.data);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }

  async function fetchTeamCertificates(){
    try{
      const response = await axiosInstance.get("/certifications/team");
      setPendingItems(response.data);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }

  async function handleCertificationApproval(decision){

    try{
      const response = await axiosInstance.post(
        `/certifications/manager-action/${selected.taskId}?approved=${decision}`
      )
      
      setPendingItems((prev) => prev.filter((i) => i.id !== selected.id));
      setSelected(null);
    } catch(e){
      alert("status update failed")
      console.log(e);
    }
  }

  const badge = (status) => {
    const map = {
      SUBMITTED: "bg-indigo-50 text-indigo-700 border-indigo-100",
      APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-100",
      REJECTED: "bg-rose-50 text-rose-700 border-rose-100",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-2">
      {/* 1. Modal Logic */}
      {selected && (
        <CertificationBriefCard
          item={selected}
          onClose={() => setSelected(null)}
          onApprove={() => {
            handleCertificationApproval(true);
          }}
          onReject={() => {
            handleCertificationApproval(false);
          }}
        />
      )}

      {/* 2. Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Professional <span className="text-indigo-600">Certifications</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic">
            Manage your credentials and reimbursements
          </p>
        </div>
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all">
          <Plus size={18} /> Submit New Cert
        </button>
      </div>

      {/* 3. Financial Summary */}
      <div className="grid sm:grid-cols-2 gap-8">
        <ValuesDisplayCard
          data={{
            context: "Available Reimbursement",
            value: summary.left,
            units: "₹",
          }}
        />
        <ValuesDisplayCard
          data={{ context: "Total Claimed", value: summary.used, units: "₹" }}
        />
      </div>

      {/* 4. Personal History */}
      <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-50 flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-gray-800">My Credential History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-4 text-left">Certification Name</th>
                <th className="px-8 py-4 text-left">Reimbursement Amount</th>
                <th className="px-8 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {myCerts.map((c) => (
                <tr
                  key={c.id}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="px-8 py-5 font-bold text-gray-800">
                    {c.certificationName}
                  </td>
                  <td className="px-8 py-5 text-gray-500 font-medium">
                    {c.reimbursementAmount}
                  </td>
                  <td className="px-8 py-5">{badge(c.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. HR Section - Passing Props Correctly */}
      {user.role === "MANAGER" && (
        <CertificationApprovalComponent
          items={pendingItems}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}
