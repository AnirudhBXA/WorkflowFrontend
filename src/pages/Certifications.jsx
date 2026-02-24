import { useContext, useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import CertificationApprovalComponent from "../components/Certifications/CertificationApproval";
import CertificationBriefCard from "../components/Certifications/CertificationBriefCard";
import { History, Users } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { ChevronLeft, ChevronRight, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function CertificationsComponent() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [myCerts, setMyCerts] = useState([]);
  const [teamCerts, setTeamCerts] = useState([]);
  const [deptCerts, setDeptCerts] = useState([]);
  const [pendingItems, setPendingItems] = useState([]);
  const [summary, setSummary] = useState({ left: 0, used: 0 });
  const [selected, setSelected] = useState(null);
  const [loadingCertId, setLoadingCertId] = useState(null);

  const [myPage, setMyPage] = useState(1);
  const [teamPage, setTeamPage] = useState(1);
  const [deptPage, setDeptPage] = useState(1);
  const [isViewingApproval, setIsViewingApproval] = useState(false); // New State

  // Update this to handle clicking from Approval table vs History table
  const handleSelectForApproval = (item) => {
    setIsViewingApproval(true);
    setSelected(item);
  };

  const handleSelectForView = (item) => {
    setIsViewingApproval(false);
    setSelected(item);
  };
  const PAGE_SIZE = 5;

  const totalTeamPages = Math.ceil(teamCerts.length / PAGE_SIZE);
  const startIndexTeam = (teamPage - 1) * PAGE_SIZE;
  const paginatedTeamCerts = teamCerts.slice(
    startIndexTeam,
    startIndexTeam + PAGE_SIZE,
  );

  const totalMyPages = Math.ceil(myCerts.length / PAGE_SIZE);
  const startIndexMy = (myPage - 1) * PAGE_SIZE;
  const paginatedMyCerts = myCerts.slice(
    startIndexMy,
    startIndexMy + PAGE_SIZE,
  );

  const totalDeptPages = Math.ceil(deptCerts.length / PAGE_SIZE);
  const startIndexDept = (deptPage - 1) * PAGE_SIZE;
  const paginatedDeptCerts = deptCerts.slice(
    startIndexDept,
    startIndexDept + PAGE_SIZE,
  );

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
        user.role === "HR"
          ? fetchDeptartmentCertifications()
          : Promise.resolve(),
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function fetchMyCertificates() {
    try{
      const res = await axiosInstance.get("/certifications/me");
      setMyCerts(res.data || []);
    } catch (e){
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load data ❌");
    }
  }

  async function fetchMySummary() {
    try{
      const res = await axiosInstance.get("/certifications/mySummary");
      setSummary(res.data);
    } catch (e){
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load data ❌");
    }
  }

  async function fetchTeamCertificates() {

    try{
      const res = await axiosInstance.get("/certifications/team");
      setTeamCerts(res.data || []);
      setPendingItems((res.data || []).filter((c) => c.status === "ASSIGNED"));
    } catch(e){
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load data ❌");
    }
  }

  async function fetchDeptartmentCertifications() {
    try{
      const response = await axiosInstance.get("/certifications/dept");
      setDeptCerts(response.data || []);
    }
    catch(e){
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
        "Failed to load data ❌");
    }
  }

  async function handleCertificationApproval(decision) {
    try {
      await axiosInstance.post(
        `/certifications/manager-action/${selected.taskId}?approved=${decision}`,
      );
      setSelected(null);
      await refreshAll();
      toast.success(decision+" successfully");
    } catch (e) {
      // console.log(error.message)
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
        "Status update failed ❌");
    }
  }

  async function handleCompleteCertification(event, item) {
    event.stopPropagation();
    try {
      setLoadingCertId(item.certId);
      const response = await axiosInstance.post(
        `/certifications/complete/${item.taskId}`,
      );
      await refreshAll();
      toast.success("Completed Successfully")
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
         "Status update failed ❌",
      );
    } finally{
      setLoadingCertId(null);
    }
  }

  async function handleHRVerifyCertification(event, item) {
    event.stopPropagation();
    try {
      setLoadingCertId(item.certId);
      const response = await axiosInstance.post(
        `/certifications/verify/${item.taskId}`,
      );
      await refreshAll();
      toast.success("Verification completed")
    } catch (e) {
      toast.error(
        e?.response?.data?.message ||
        e?.message ||
        "Status update failed ❌"
      );
    } finally{
      setLoadingCertId(null);
    }
  }

  const badge = (status) => {
    const map = {
      VERIFIED: "bg-indigo-500/10 text-indigo-400",
      COMPLETED: "bg-blue-500/10 text-blue-400",
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
          onClose={() => {
            setSelected(null);
            setIsViewingApproval(false);
          }}
          onApprove={() => handleCertificationApproval(true)}
          onReject={() => handleCertificationApproval(false)}
          showActions={isViewingApproval}
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
              <th className="px-6 py-4 text-left">Cert Id</th>
              <th className="px-6 py-4 text-left">Certification</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {paginatedMyCerts.map((c) => (
              <tr
                key={c.certId}
                onClick={() => handleSelectForView(c)}
                className="hover:bg-[#0B1220] cursor-pointer"
              >
                <td className="px-6 py-5 font-semibold text-slate-200">
                  {c.certId}
                </td>
                <td className="px-6 py-5 font-semibold text-slate-200">
                  {c.certificationName}
                </td>
                <td className="px-6 py-5 text-slate-400">
                  ₹ {c.reimbursementAmount}
                </td>
                <td className="px-6 py-5">{badge(c.status)}</td>
                <td className="px-6 py-5">
                  {c.status === "APPROVED" && (
                    <button
                      onClick={(e) => handleCompleteCertification(e, c)}
                      className="bg-blue-700 text-white px-4 py-1 rounded-md 
                                font-semibold text-sm hover:bg-blue-700 
                                active:scale-95 transition duration-200
                                flex items-center gap-2"
                    >
                      Complete

                      {loadingCertId === c.certId && (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {totalMyPages > 1 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
            <span className="text-xs text-slate-500">
              Page {myPage} of {totalMyPages}
            </span>

            <div className="flex items-center gap-2">
              <button
                disabled={myPage === 1}
                onClick={() => setMyPage((p) => p - 1)}
                className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={14} />
              </button>

              <button
                disabled={myPage === totalMyPages}
                onClick={() => setMyPage((p) => p + 1)}
                className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {user.role === "HR" && (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-400" />
            <h2 className="text-sm font-bold uppercase text-slate-300">
              Department Certifications
            </h2>
          </div>

          <table className="w-full text-sm">
            <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 text-left">Cert Id</th>
                <th className="px-6 py-4 text-left">Certification</th>
                <th className="px-6 py-4 text-left">Amount</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedDeptCerts.map((c) => (
                <tr
                  key={c.certId}
                  onClick={() => setSelected(c)}
                  className="hover:bg-[#0B1220] cursor-pointer"
                >
                  <td className="px-6 py-5 font-semibold text-slate-200">
                    {c.certId}
                  </td>
                  <td className="px-6 py-5 font-semibold text-slate-200">
                    {c.certificationName}
                  </td>
                  <td className="px-6 py-5 text-slate-400">
                    ₹ {c.reimbursementAmount}
                  </td>
                  <td className="px-6 py-5">{badge(c.status)}</td>
                  <td className="px-6 py-5">
                    {c.status === "COMPLETED" && (
                      <button
                        onClick={(e) => handleHRVerifyCertification(e, c)}
                        className="bg-blue-700 text-white px-4 py-1 rounded-md 
                                font-semibold text-sm hover:bg-blue-700 
                                active:scale-95 transition duration-200
                                flex items-center gap-2">
                        Verify

                        {loadingCertId === c.certId && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalDeptPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
              <span className="text-xs text-slate-500">
                Page {deptPage} of {totalDeptPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={deptPage === 1}
                  onClick={() => setDeptPage((p) => p - 1)}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  disabled={deptPage === totalDeptPages}
                  onClick={() => setDeptPage((p) => p + 1)}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

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
                <th className="px-6 py-4 text-left">Cert Id</th>
                <th className="px-6 py-4 text-left">Employee</th>
                <th className="px-6 py-4 text-left">Certification</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {paginatedTeamCerts.map((c) => (
                <tr
                  key={c.certId}
                  onClick={() => handleSelectForView(c)}
                  className="hover:bg-[#0B1220] cursor-pointer"
                >
                  <td className="px-6 py-5 text-slate-200">{c.certId}</td>
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

          {totalTeamPages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-800 bg-[#0B1220]">
              <span className="text-xs text-slate-500">
                Page {teamPage} of {totalTeamPages}
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={teamPage === 1}
                  onClick={() => setTeamPage((p) => p - 1)}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronLeft size={14} />
                </button>

                <button
                  disabled={teamPage === totalTeamPages}
                  onClick={() => setTeamPage((p) => p + 1)}
                  className="p-2 rounded-lg border border-slate-700 text-slate-400 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {user.role === "MANAGER" && (
        <CertificationApprovalComponent
          items={pendingItems}
          setSelected={handleSelectForApproval}
        />
      )}
    </div>
  );
}
