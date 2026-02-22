import { useContext, useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import CertificationApprovalComponent from "../components/Certifications/CertificationApproval";
import CertificationBriefCard from "../components/Certifications/CertificationBriefCard";
import { History } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

export default function CertificationsComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myCerts, setMyCerts] = useState([]);
  const [summary, setSummary] = useState({ left: 0, used: 0 });
  const [pendingItems, setPendingItems] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchMyCertificates();
    fetchMySummary();
    if (user.role === "MANAGER") {
      fetchTeamCertificates();
    }
  }, []);

  async function fetchMyCertificates() {
    try {
      const response = await axiosInstance.get("/certifications/me");
      setMyCerts(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMySummary() {
    try {
      const response = await axiosInstance.get("/certifications/mySummary");
      setSummary(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeamCertificates() {
    try {
      const response = await axiosInstance.get("/certifications/team");
      setPendingItems(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleCertificationApproval(decision) {
    try {
      await axiosInstance.post(
        `/certifications/manager-action/${selected.taskId}?approved=${decision}`,
      );
      setPendingItems((prev) => prev.filter((i) => i.id !== selected.id));
      setSelected(null);
    } catch {
      alert("status update failed");
    }
  }

  const badge = (status) => {
    const map = {
      SUBMITTED: "bg-indigo-500/10 text-indigo-400",
      APPROVED: "bg-emerald-500/10 text-emerald-400",
      REJECTED: "bg-rose-500/10 text-rose-400",
      ASSIGNED: "bg-yellow-500/10 text-yellow-400",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg text-[10px] font-bold uppercase ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="h-8 w-8 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {selected && (
        <CertificationBriefCard
          item={selected}
          onClose={() => setSelected(null)}
          onApprove={() => handleCertificationApproval(true)}
          onReject={() => handleCertificationApproval(false)}
        />
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Professional Certifications
          </h1>
          <p className="text-slate-400 mt-1">
            Manage your credentials and reimbursements
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-8">
        <ValuesDisplayCard
          data={{
            context: "Available Reimbursement",
            value: summary.left,
            units: "₹",
          }}
        />
        <ValuesDisplayCard
          data={{
            context: "Total Claimed",
            value: summary.used,
            units: "₹",
          }}
        />
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <History className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold uppercase text-slate-300">
            My Certifications
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 text-left">Certification</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {myCerts.map((c) => (
                <tr key={c.id} className="hover:bg-[#0B1220] transition">
                  <td className="px-6 py-5 font-semibold text-slate-200">
                    {c.certificationName}
                  </td>
                  <td className="px-6 py-5 text-slate-400">
                    ₹ {c.reimbursementAmount}
                  </td>
                  <td className="px-6 py-5">{badge(c.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user.role === "MANAGER" && (
        <CertificationApprovalComponent
          items={pendingItems}
          setSelected={setSelected}
        />
      )}
    </div>
  );
}
