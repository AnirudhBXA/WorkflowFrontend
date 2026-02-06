import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import MetricProgressCard from "../components/MetricProgressCard";
import { AuthContext } from "../context/AuthContext";

function formatDateTime(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12;
  return `${day}/${month}/${year}, ${hour12}:${minutes} ${ampm}`;
}

function RescheduleCard(){
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded-xl shadow-xl p-6 animate-fadeIn">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Reschedule Interview
          </h2>
          <button
            onClick={() => setShowReschedule(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          {/* User Name */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              User Name
            </label>
            <input
              type="text"
              value={rescheduleData.userName}
              onChange={(e) =>
                setRescheduleData({ ...rescheduleData, userName: e.target.value })
              }
              placeholder="Enter user name"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>

          {/* New Date */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Interview Date
            </label>
            <input
              type="date"
              value={rescheduleData.newDate}
              onChange={(e) =>
                setRescheduleData({ ...rescheduleData, newDate: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setShowReschedule(false)}
            className="px-4 py-2 text-sm border rounded-md text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={() => hrRescheduleInterview(rescheduleData)}
            className="px-4 py-2 text-sm rounded-md bg-amber-500 text-white hover:bg-amber-600"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  )
}

export default function InterviewsComponent() {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const { user } = useContext(AuthContext)
  const [showReschedule, setShowReschedule] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    taskId: null,
    newDate: "",
    userName: "",
  });

  useEffect(() => {
    async function fetchInterviews() {
      try {
        const res = await axiosInstance.get("/interview/me");
        setInterviews(res.data.interviews || []);
        console.log("Fetched interviews:", res.data.interviews);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInterviews();
  }, []);

  async function handleStatusUpdate(newStatus, taskId) {
    try {
      await axiosInstance.post(`/interview/complete/${taskId}`, {
        status: newStatus,
      });
      setInterviews((prev) =>
        prev.map((i) =>
          i.taskId === taskId ? { ...i, status: newStatus } : i,
        ),
      );
    } catch (error) {
      console.error("Failed to update interview status:", error);
    }
  }

  async function rescheduleInterview(taskId) {
    try {
      await axiosInstance.post(`/interview/reschedule/${taskId}`);
      setInterviews((prev) =>
        prev.map((i) =>
          i.taskId === taskId ? { ...i, status: "RESCHEDULE REQUESTED" } : i,
        ),
      );
    } catch (error) {
      console.error("Failed to reschedule interview:", error);
    }
  }

  async function hrCloseInterview(taskId){

  }

  const badgeStyles = {
    PENDING:
      "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300",
    COMPLETED:
      "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300",
    NO_SHOW: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300",
    CANCELLED: "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
    RESCHEDULE:
      "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
  };

  const stats = {
    total: interviews.length,
    completed: interviews.filter((i) => i.status === "COMPLETED").length,
    noShow: interviews.filter((i) => i.status === "NO_SHOW").length,
    pending: interviews.filter((i) => i.status === "PENDING").length,
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="h-10 w-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        My Interviews
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricProgressCard title="Total Interviews" value={stats.total} />
        <MetricProgressCard title="Completed" value={stats.completed} />
        <MetricProgressCard title="No Show" value={stats.noShow} />
        <MetricProgressCard title="Pending" value={stats.pending} />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3 text-left">Candidate Email</th>
              <th className="px-6 py-3 text-left">Scheduled At</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                <td className="px-6 py-4">{item.intervieweeEmail}</td>
                <td className="px-6 py-4">
                  {formatDateTime(item.scheduledAt)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[item.status]}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {item.status === "PENDING" && (
                    <div className="flex gap-2">
                      <button
                        onClick={() =>
                          handleStatusUpdate("COMPLETED", item.taskId)
                        }
                        className="px-3 py-1 text-xs font-medium rounded-md bg-green-500 text-white hover:bg-green-600"
                      >
                        Mark Completed
                      </button>
                      <button
                        onClick={() => handleStatusUpdate("RESCHEDULE", item.taskId)}
                        className="px-3 py-1 text-xs font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600"
                      >
                        Reschedule
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate("NO_SHOW", item.taskId)
                        }
                        className="px-3 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600"
                      >
                        No Show
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {(user?.role === "HR") && (
        <>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Scheduled Interviews
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-left">Candidate Email</th>
                <th className="px-6 py-3 text-left">Scheduled At</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-6 py-4">{item.intervieweeEmail}</td>
                  <td className="px-6 py-4">
                    {formatDateTime(item.scheduledAt)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">

                    {showReschedule && (
                      <RescheduleCard></RescheduleCard>
                    )}

                    {item.status === "RESCHEDULE" && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setShowReschedule(true);
                            setRescheduleData({
                              taskId: item.taskId,
                              newDate: "",
                              userName: "",
                            });
                          }}
                          className="px-3 py-1 text-xs font-medium rounded-md bg-amber-500 text-white hover:bg-amber-600"
                        >
                          Reschedule
                        </button>
                      </div>
                    )}

                    {(item.status === "NO_SHOW" || item.status === "COMPLETED") && (
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            hrCloseInterview(item.taskId)
                          }
                          className="px-3 py-1 text-xs font-medium rounded-md bg-red-500 text-white hover:bg-red-600"
                        >
                          Close
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        </>
      )}
    </div>
  );
}
