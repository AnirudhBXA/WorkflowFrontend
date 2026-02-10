import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import MetricProgressCard from "../components/Interview/MetricProgressCard";
import { formatDateTime } from "../utils/dateFormatter";
import RescheduleCard from "../components/Interview/RescheduleCard";
import { AuthContext } from "../context/AuthContext";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Video,
  MoreHorizontal,
  User,
} from "lucide-react";

export default function InterviewsComponent() {
  const [loading, setLoading] = useState(true);
  const [interviews, setInterviews] = useState([]);
  const [employeeInterviews, setEmployeeInterviews] = useState([])
  const { user } = useContext(AuthContext);
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
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchInterviews();
    fetchEmployeeInterviews();
  }, []);

  async function fetchEmployeeInterviews(){
    try{
      const res = await axiosInstance.get("/interview/employees");
      setEmployeeInterviews(res.data || []);
    } catch(error) {
      console.log("Error fetching Employees interviews", error);
    } finally{
      setLoading(false);
    }
  }

  async function handleStatusUpdate(newStatus, taskId) {
    try {
      await axiosInstance.post(`/interview/complete/${taskId}`, {
        status: newStatus,
      });
      setLoading(true);

      setInterviews((prev) =>
        prev.map((i) =>
          i.taskId === taskId ? { ...i, status: newStatus } : i,
        ),
      );
    } catch (error) {
      console.error("Failed to update interview status:", error);
    } finally {
      setLoading(false);
    }
  }

  async function hrCloseInterview(taskId) {}

  const badgeStyles = {
    PENDING: "bg-amber-50 text-amber-700 border-amber-100",
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    NO_SHOW: "bg-rose-50 text-rose-700 border-rose-100",
    CANCELLED: "bg-gray-100 text-gray-600 border-gray-200",
    RESCHEDULE: "bg-indigo-50 text-indigo-700 border-indigo-100",
  };

  const stats = [
    {
      title: "Total Sessions",
      value: interviews.length,
      icon: Video,
      color: "text-indigo-600",
    },
    {
      title: "Completed",
      value: interviews.filter((i) => i.status === "COMPLETED").length,
      icon: CheckCircle,
      color: "text-emerald-600",
    },
    {
      title: "No Show",
      value: interviews.filter((i) => i.status === "NO_SHOW").length,
      icon: XCircle,
      color: "text-rose-600",
    },
    {
      title: "Upcoming",
      value: interviews.filter((i) => i.status === "PENDING").length,
      icon: Clock,
      color: "text-amber-600",
    },
  ];

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-2">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">
          Interview <span className="text-indigo-600">Scheduler</span>
        </h1>
        <p className="text-gray-500 font-medium mt-1">
          Manage candidate evaluations and session logistics
        </p>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <MetricProgressCard
            key={idx}
            title={stat.title}
            value={stat.value}
            Icon={stat.icon}
            iconColor={stat.color}
          />
        ))}
      </div>

      {/* Interviewer Table */}
      <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h2 className="font-bold text-gray-800 flex items-center gap-2 text-sm uppercase tracking-wider">
            <Calendar className="w-4 h-4 text-indigo-600" /> My Schedule
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                <th className="px-8 py-4 text-left">Candidate</th>
                <th className="px-8 py-4 text-left">Date & Time</th>
                <th className="px-8 py-4 text-left">Status</th>
                <th className="px-8 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {interviews.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-indigo-50/30 transition-colors"
                >
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs uppercase">
                        {item.intervieweeEmail.charAt(0)}
                      </div>
                      <span className="font-bold text-gray-700">
                        {item.intervieweeEmail}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-gray-500 font-medium">
                    {formatDateTime(item.scheduledAt)}
                  </td>
                  <td className="px-8 py-5">
                    <span
                      className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${badgeStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    {item.status === "PENDING" && (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleStatusUpdate("COMPLETED", item.taskId)
                          }
                          className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate("RESCHEDULE", item.taskId)
                          }
                          className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all"
                        >
                          <Clock size={16} />
                        </button>
                        <button
                          onClick={() =>
                            handleStatusUpdate("NO_SHOW", item.taskId)
                          }
                          className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* HR Perspective */}
      {user?.role === "HR" && (
        <div className="space-y-6 pt-10">
          <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-2">
            <User className="text-indigo-600" /> Admin Oversight
          </h2>
          <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-widest text-gray-400">
                  <th className="px-8 py-4 text-left">Candidate</th>
                  <th className="px-8 py-4 text-left">Session Status</th>
                  <th className="px-8 py-4 text-center">Resolution</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {employeeInterviews.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-indigo-50/30 transition-colors"
                  >
                    <td className="px-8 py-6 font-bold text-gray-700">
                      {item.intervieweeEmail}
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${badgeStyles[item.status]}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-center">
                      {item.status === "RESCHEDULE" ? (
                        <button
                          onClick={() => {
                            setShowReschedule(true);
                            setRescheduleData({
                              ...rescheduleData,
                              taskId: item.taskId,
                            });
                          }}
                          className="text-xs font-black text-indigo-600 hover:underline uppercase tracking-tighter"
                        >
                          Set New Slot
                        </button>
                      ) : (
                        <button
                          onClick={() => hrCloseInterview(item.taskId)}
                          className="p-2 text-gray-400 hover:text-rose-600 transition-colors"
                        >
                          <MoreHorizontal size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {showReschedule && (
        <RescheduleCard
          data={rescheduleData}
          setData={setRescheduleData}
          onClose={() => setShowReschedule(false)}
          onConfirm={hrRescheduleInterview}
        />
      )}
    </div>
  );
}
