import { useContext, useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import CertificationApprovalComponent from "../components/Certifications/CertificationApproval";
import CertificationBriefCard from "../components/Certifications/CertificationBriefCard";
import { History, Users } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

export default function CertificationsComponent() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [myCerts, setMyCerts] = useState([]);
  const [teamCerts, setTeamCerts] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [summary, setSummary] = useState({ left: 0, used: 0 });
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (user) {
      refreshAll();
    }
  }, [user]);

  async function refreshAll() {
    setLoading(true);
    try {
      await Promise.all([
        fetchMyCertificates(),
        fetchMySummary(),
        user.role === "MANAGER" ? fetchTeamCertificates() : Promise.resolve(),
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMyCertificates() {
    const res = await axiosInstance.get("/certifications/me");
    setMyCerts(res.data || []);
  }

  async function fetchMySummary() {
    const res = await axiosInstance.get("/certifications/mySummary");
    setSummary(res.data);
  }

  async function fetchTeamCertificates() {
    const res = await axiosInstance.get("/certifications/team");
    setTeamCerts(res.data || []);
    setPendingItems((res.data || []).filter((c) => c.taskId));
  }

  async function handleCertificationApproval(decision) {
    try {
      await axiosInstance.post(
        `/certifications/manager-action/${selected.taskId}?approved=${decision}`,
      );
      setSelected(null);
      await refreshAll();
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          "Status update failed. Please try again.",
      );
    }
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

    <div>
      <h1 className="text-3xl font-extrabold text-white">
        Professional Certifications
      </h1>
      <p className="text-slate-400 mt-1">
        Manage your credentials and reimbursements
      </p>
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

    {/* MY CERTIFICATIONS */}
    <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
        <History className="w-5 h-5 text-indigo-400" />
        <h2 className="text-sm font-bold uppercase text-slate-300">
          My Certifications
        </h2>
      </div>

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
            <tr
              key={c.certId}
              onClick={() => setSelected(c)}
              className="hover:bg-[#0B1220] cursor-pointer"
            >
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

    {/* TEAM CERTIFICATIONS */}
    {user.role === "MANAGER" && (
      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <Users className="w-5 h-5 text-indigo-400" />
          <h2 className="text-sm font-bold uppercase text-slate-300">
            Team Certifications
          </h2>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Employee</th>
              <th className="px-6 py-4 text-left">Certification</th>
              <th className="px-6 py-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {teamCerts.map((c) => (
              <tr
                key={c.certId}
                onClick={() => setSelected(c)}
                className="hover:bg-[#0B1220] cursor-pointer"
              >
                <td className="px-6 py-5 text-slate-200">
                  {c.employee?.name || "—"}
                </td>
                <td className="px-6 py-5 text-slate-400">
                  {c.certificationName}
                </td>
                <td className="px-6 py-5">{badge(c.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}

    {user.role === "MANAGER" && (
      <CertificationApprovalComponent
        items={pendingItems}
        setSelected={setSelected}
      />
    )}
  </div>
);
