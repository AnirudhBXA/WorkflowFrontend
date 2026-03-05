import { useContext, useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import CertificationApprovalComponent from "../components/Certifications/CertificationApproval";
import CertificationBriefCard from "../components/Certifications/CertificationBriefCard";
import { History, Users } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";
import { ChevronLeft, ChevronRight, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";
// import { Check, X, User, Loader2 } from "lucide-react";

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
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    field: null,
    direction: "asc",
  });

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

  const sortedTeamcerts = sortData(teamCerts);
  const totalTeamPages = Math.ceil(teamCerts.length / PAGE_SIZE);
  const startIndexTeam = (teamPage - 1) * PAGE_SIZE;
  const paginatedTeamCerts = sortedTeamcerts.slice(
    startIndexTeam,
    startIndexTeam + PAGE_SIZE,
  );

  const sortedMycerts = sortData(myCerts);
  const totalMyPages = Math.ceil(myCerts.length / PAGE_SIZE);
  const startIndexMy = (myPage - 1) * PAGE_SIZE;
  const paginatedMyCerts = sortedMycerts.slice(
    startIndexMy,
    startIndexMy + PAGE_SIZE,
  );

  const sortedDeptcerts = sortData(deptCerts);
  const totalDeptPages = Math.ceil(deptCerts.length / PAGE_SIZE);
  const startIndexDept = (deptPage - 1) * PAGE_SIZE;
  const paginatedDeptCerts = sortedDeptcerts.slice(
    startIndexDept,
    startIndexDept + PAGE_SIZE,
  );

  useEffect(() => {
    if (user) {
      refreshAll();
    }

    console.log(user);
  }, [user]);

  function sortData(data) {
    if (!sortConfig.field) return data;

    return [...data].sort((a, b) => {
      let aValue = a[sortConfig.field];
      let bValue = b[sortConfig.field];

      if (sortConfig.field === "certName") {
        aValue = a.certificationName || "";
        bValue = b.certificationName || "";
      }

      if (sortConfig.field === "dueDate") {
        aValue = new Date(a.dueDate);
        bValue = new Date(b.dueDate);
      }

      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;

      return 0;
    });
  }


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
    try {
      const res = await axiosInstance.get("/certifications/me");
      setMyCerts(res.data || []);
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Failed to load data ❌",
      );
    }
  }

  async function fetchMySummary() {
    try {
      const res = await axiosInstance.get("/certifications/mySummary");
      setSummary(res.data);
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Failed to load data ❌",
      );
    }
  }

  async function fetchTeamCertificates() {
    try {
      const res = await axiosInstance.get("/certifications/team");
      setTeamCerts(res.data || []);
      setPendingItems((res.data || []).filter((c) => c.status === "ASSIGNED"));
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Failed to load data ❌",
      );
    }
  }

  async function fetchDeptartmentCertifications() {
    try {
      const response = await axiosInstance.get("/certifications/dept");
      setDeptCerts(response.data || []);
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Failed to load data ❌",
      );
    }
  }

  async function handleCertificationApproval(decision) {
    try {
      await axiosInstance.post(
        `/certifications/manager-action/${selected.taskId}?approved=${decision}`,
      );
      setSelected(null);
      await refreshAll();
      toast.success(decision + " successfully");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Status update failed ❌",
      );
    }
  }

  async function handleFileUpload() {
    if (!selectedFile || !selectedCert) return;

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      await axiosInstance.post(
        `/certifications/complete/${selectedCert.taskId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Completed Successfully ✅");

      setShowUploadModal(false);
      setSelectedFile(null);
      setSelectedCert(null);

      await refreshAll();
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Upload failed ❌",
      );
    } finally {
      setUploading(false);
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
      toast.success("Completed Successfully");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Status update failed ❌",
      );
    } finally {
      setLoadingCertId(null);
    }
  }

  async function handleManagerVerifyCertification(event, taskId, decision) {
    event.stopPropagation();
    try {
      // setLoadingCertId(item.certId);
      const response = await axiosInstance.post(
        `/certifications/manager-verification/${taskId}?approved=${decision}`,
      );
      await refreshAll();
      toast.success("Verification completed");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Status update failed ❌",
      );
    } finally {
      // setLoadingCertId(null);
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
      toast.success("Verification completed");
    } catch (e) {
      toast.error(
        e?.response?.data?.message || e?.message || "Status update failed ❌",
      );
    } finally {
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

      {showUploadModal && (
        <div className="fixed inset-0 backdrop-blur-md bg-black/30 flex justify-center items-center z-50 transition-all">
          <div className="bg-[#0F172A] text-white p-6 rounded-2xl w-105 shadow-2xl border border-slate-700">
            {/* Title */}
            <h2 className="text-xl font-semibold mb-5 text-slate-200">
              Upload Completed Certificate
            </h2>

            {/* File Input */}
            <label
              className={`flex flex-col items-center justify-center border-2 border-dashed 
  border-slate-600 rounded-xl p-6 transition
  ${selectedFile ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover:border-indigo-500"}`}
            >
              {!selectedFile && (
                <>
                  <span className="text-slate-400 text-sm mb-2">
                    Click to upload ONE file (.pdf, .jpg, .png)
                  </span>

                  <input
                    type="file"
                    accept=".pdf,.jpg,.png"
                    multiple={false}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) setSelectedFile(file);
                    }}
                    className="hidden"
                  />
                </>
              )}

              {selectedFile && (
                <div className="text-indigo-400 text-sm text-center">
                  {selectedFile.name}
                </div>
              )}
            </label>

            {/* Selected File Preview */}
            {selectedFile && (
              <div className="mt-4 text-sm text-indigo-400 truncate">
                Selected: {selectedFile.name}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setSelectedFile(null);
                }}
                className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 transition text-sm"
              >
                Cancel
              </button>

              <button
                onClick={handleFileUpload}
                disabled={!selectedFile || uploading}
                className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition
            ${
              !selectedFile || uploading
                ? "bg-indigo-900 opacity-60 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-500 active:scale-95"
            }`}
              >
                {uploading ? "Uploading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
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

          <div className="flex items-center gap-4 mb-4">
            <select
              value={sortConfig.field}
              onChange={(e) =>
                setSortConfig((prev) => ({ ...prev, field: e.target.value }))
              }
              className="bg-[#0B1220] border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm"
            >
              <option value="dueDate">Sort by Due Date</option>
              <option value="certName">Sort by Name</option>
              <option value="status">Sort by Status</option>
            </select>

            <select
              value={sortConfig.direction}
              onChange={(e) =>
                setSortConfig((prev) => ({
                  ...prev,
                  direction: e.target.value,
                }))
              }
              className="bg-[#0B1220] border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
            <tr>
              <th className="px-6 py-4 text-left">Cert Id</th>
              <th className="px-6 py-4 text-left">Certification</th>
              <th className="px-6 py-4 text-left">Amount</th>
              <th className="px-6 py-4 text-left">Due date</th>
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
                <td className="px-6 py-5 text-slate-400">{c.dueDate}</td>
                <td className="px-6 py-5">{badge(c.status)}</td>
                <td className="px-6 py-5">
                  {c.status === "APPROVED" && c.assignee === user.username && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCert(c);
                        setShowUploadModal(true);
                      }}
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

        {totalMyPages > 0 && (
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
              <div className="flex items-center gap-4 mb-4">
                <select
                  value={sortConfig.field}
                  onChange={(e) =>
                    setSortConfig((prev) => ({
                      ...prev,
                      field: e.target.value,
                    }))
                  }
                  className="bg-[#0B1220] border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm"
                >
                  <option value="dueDate">Sort by Due Date</option>
                  <option value="certName">Sort by Name</option>
                  <option value="status">Sort by Status</option>
                </select>

                <select
                  value={sortConfig.direction}
                  onChange={(e) =>
                    setSortConfig((prev) => ({
                      ...prev,
                      direction: e.target.value,
                    }))
                  }
                  className="bg-[#0B1220] border border-slate-700 text-slate-300 px-3 py-2 rounded-lg text-sm"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
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
                    {c.status === "COMPLETED" &&
                      c.assignee === user.username && (
                        <button
                          onClick={(e) => handleHRVerifyCertification(e, c)}
                          className="bg-blue-700 text-white px-4 py-1 rounded-md 
                                font-semibold text-sm hover:bg-blue-700 
                                active:scale-95 transition duration-200
                                flex items-center gap-2"
                        >
                          Start Reimbursement
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

          {totalDeptPages > 0 && (
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
                <th className="px-6 py-4 text-left">Action</th>
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
                  <td className="px-6 py-5">
                    {c.status === "COMPLETED" &&
                      c.assignee === user.username && (
                        <div>
                          <button
                            onClick={(e) =>
                              handleManagerVerifyCertification(
                                e,
                                c.taskId,
                                true,
                              )
                            }
                            className="bg-blue-700 text-white px-4 py-1 rounded-md 
                                font-semibold text-sm hover:bg-blue-700 
                                active:scale-95 transition duration-200
                                flex items-center gap-2"
                          >
                            Verify
                            {/* {loadingCertId === c.certId && (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        )} */}
                          </button>
                        </div>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {totalTeamPages > 0 && (
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
