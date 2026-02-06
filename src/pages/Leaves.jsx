import { useEffect, useState, useContext } from "react";
import axiosInstance from "../utils/axiosInstance";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import LeaveApprovalComponent from "../components/Leaves/LeaveApproval";
import { AuthContext } from "../context/AuthContext";

function formatDateToDDMMYYYY(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export default function LeavesComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState({ available: 0, used: 0 });
  const [leavesList, setLeavesList] = useState([]);

  useEffect(() => {
    async function fetchLeaves() {
      try {
        const res = await axiosInstance.get("/leaves/me");
        console.log("Leave data fetched:", res.data);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const statusBadge = (status) => {
    const map = {
      APPROVED:
        "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
      PENDING:
        "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
      REJECTED: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Leave Management
      </h1>

      {/* Summary Cards */}
      <div className="grid sm:grid-cols-2 gap-6">
        <ValuesDisplayCard
          data={{
            context: "Available Leaves",
            value: summary.available,
            units: "days",
          }}
        />
        <ValuesDisplayCard
          data={{ context: "Leaves Used", value: summary.used, units: "days" }}
        />
      </div>

      {/* Leave History Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 font-semibold text-gray-700 dark:text-gray-200">
          My Leave Records
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Type</th>
              <th className="px-6 py-3 text-left">From</th>
              <th className="px-6 py-3 text-left">To</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Reason</th>
            </tr>
          </thead>
          <tbody>
            {leavesList.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {item.leaveType}
                </td>
                <td className="px-6 py-4">{formatDateToDDMMYYYY(item.startDate)}</td>
                <td className="px-6 py-4">{formatDateToDDMMYYYY(item.endDate)}</td>
                <td className="px-6 py-4">{statusBadge(item.status)}</td>
                <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                  {item.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Manager Section */}
      {user?.role === "MANAGER" && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Manager Actions
          </h2>
          <LeaveApprovalComponent />
        </div>
      )}
    </div>
  );
}
