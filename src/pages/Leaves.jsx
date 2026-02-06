import { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import LeaveApprovalComponent from "../components/Leaves/LeaveApproval";
import { AuthContext } from "../context/AuthContext";
import DepartmentLeaves from "../components/Leaves/DepartmentLeaves";
import { Calendar, FileText, UserCheck, Briefcase } from "lucide-react";

export default function LeavesComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ available: 0, used: 0 });
  const [leavesList, setLeavesList] = useState([]);

  useEffect(() => {
    async function fetchLeaves() {
      try {
        const res = await axiosInstance.get("/leaves/me");
        setLeavesList(res.data || []);
        setSummary({ available: 30 - res.data.length, used: res.data.length });
      } catch (error) {
        console.error("Error fetching leave data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeaves();
  }, []);

  const statusBadge = (status) => {
    const map = {
      APPROVED: "bg-emerald-50 text-emerald-700 border-emerald-100",
      PENDING: "bg-amber-50 text-amber-700 border-amber-100",
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
      {/* Header Area */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Leave Management
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic">
            Track your time-off and department requests
          </p>
        </div>
        <button className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95">
          + Request Leave
        </button>
      </div>

      {/* Summary Section */}
      <div className="grid sm:grid-cols-2 gap-6">
        <ValuesDisplayCard
          data={{
            context: "Available Balance",
            value: summary.available,
            units: "Days",
          }}
        />
        <ValuesDisplayCard
          data={{
            context: "Utilized Leaves",
            value: summary.used,
            units: "Days",
          }}
        />
      </div>

      {/* Personal Records */}
      <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-50 flex items-center gap-2">
          <FileText className="w-5 h-5 text-indigo-600" />
          <h2 className="font-bold text-gray-800">My Leave History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                <th className="px-8 py-4 text-left">Type</th>
                <th className="px-8 py-4 text-left">Timeline</th>
                <th className="px-8 py-4 text-left">Status</th>
                <th className="px-8 py-4 text-left">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {leavesList.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="px-8 py-5 font-bold text-gray-700">
                    {item.leaveType}
                  </td>
                  <td className="px-8 py-5 text-gray-500 font-medium">
                    {new Date(item.startDate).toLocaleDateString()}{" "}
                    <span className="mx-2 text-gray-300">→</span>{" "}
                    {new Date(item.endDate).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5">{statusBadge(item.status)}</td>
                  <td className="px-8 py-5 text-gray-400 truncate max-w-xs">
                    {item.reason}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Management Sections */}
      {user?.role === "MANAGER" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <UserCheck className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Subordinate Approvals
            </h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 p-6">
            <LeaveApprovalComponent />
          </div>
        </div>
      )}

      {user?.role === "HR" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 px-2">
            <Briefcase className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Organization Overview
            </h2>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 p-6">
            <DepartmentLeaves />
          </div>
        </div>
      )}
    </div>
  );
}
