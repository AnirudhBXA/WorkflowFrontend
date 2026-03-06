import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import MetricProgressCard from "../components/Interview/MetricProgressCard";
import { formatDateTime } from "../utils/dateFormatter";
import RescheduleCard from "../components/Interview/RescheduleCard";
import { AuthContext } from "../context/AuthContext";
import { Calendar, CheckCircle, XCircle, Clock, Video } from "lucide-react";
import { toast } from "sonner";

export default function InterviewsComponent() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const [interviews, setInterviews] = useState([]);
  const [employeeInterviews, setEmployeeInterviews] = useState([]);

  const [selectedInterview, setSelectedInterview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [showRescheduleCard, setShowRescheduleCard] = useState(false);
  const [rescheduleData, setRescheduleData] = useState({
    taskId: null,
    newDate: "",
    userName: "",
    newInterviewerEmail: "",
  });

  const [interviewPage, setInterviewPage] = useState(0);
  const [employeePage, setEmployeePage] = useState(0);

  const [totalInterviewPages, setTotalInterviewPages] = useState(0);
  const [totalEmployeePages, setTotalEmployeePages] = useState(0);

  const [feedback, setFeedback] = useState("");
  const [outcome, setOutcome] = useState("");

  useEffect(() => {
    refreshAfterAction();
  }, [user]);

  async function fetchInterviews() {
    const res = await axiosInstance.get("/interview/me", {
      params: {
        page: interviewPage,
      },
    });
    setInterviews(res.data.interviews.content || []);
    setTotalInterviewPages(res.data.interviews.totalPages);
  }

  async function fetchEmployeeInterviews() {
    const res = await axiosInstance.get("/interview/employees", {
      params: {
        page: employeePage,
      },
    });
    setEmployeeInterviews(res.data.interviews.content || []);
    setTotalEmployeePages(res.data.interviews.totalPages);
  }

  async function refreshAfterAction() {
    setLoading(true);
    try {
      await fetchInterviews();
      if (user?.role === "HR_RECRUITMENT") {
        await fetchEmployeeInterviews();
      }
    } finally {
      setLoading(false);
    }
  }

  function openInterviewModal(interview) {
    setSelectedInterview(interview);
    setFeedback(interview.feedback || "");
    setOutcome(interview.outcome || "");
    setShowModal(true);
  }

  function closeInterviewModal() {
    setShowModal(false);
    setSelectedInterview(null);
    setFeedback("");
    setOutcome("");
  }

  const validateStatusUpdate = (scheduledDateTime) => {
    const now = new Date();

    const scheduled = new Date(`${scheduledDateTime}:00`);
    const endWindow = new Date(scheduled.getTime() + 24 * 60 * 60 * 1000);

    if (now < scheduled) {
      toast.error("You cannot mark status before the scheduled date.");
      return false;
    }

    if (now > endWindow) {
      toast.error(
        "You cannot mark status after 24 hours of the scheduled time.",
      );
      return false;
    }

    return true;
  };

  async function handleStatusUpdate(status) {
    if (!selectedInterview) return;

    setActionLoading(status);
    if (!validateStatusUpdate(selectedInterview.scheduledDate)) {
      setActionLoading(null);
      console.log("sdlfjslfjlkj");
      return;
    }
    
    try {
      await axiosInstance.post(
        `/interview/complete/${selectedInterview.taskId}`,
        { status, feedback, outcome },
      );

      closeInterviewModal();
      await refreshAfterAction();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to update status",
      );
    } finally {
      setActionLoading(null);
    }
  }

  async function hrRescheduleInterview(payload) {
    setActionLoading(true);
    try {
      await axiosInstance.post(`/interview/reschedule/${payload.taskId}`, {
        newDate: payload.newDate,
        newInterviewerEmail: payload.newInterviewerEmail,
      });
      await refreshAfterAction();
      setShowRescheduleCard(false);
      closeInterviewModal();
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to Reschedule",
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function hrCloseInterview(taskId) {
    setActionLoading(true);
    try {
      await axiosInstance.post(`/interview/close/${taskId}`);
      await refreshAfterAction();
      closeInterviewModal();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error?.message || "Failed to close",
      );
    } finally {
      setActionLoading(false);
    }
  }

  const badgeStyles = {
    SCHEDULED: "bg-amber-500/10 text-amber-400",
    COMPLETED: "bg-emerald-500/10 text-emerald-400",
    NO_SHOW: "bg-rose-500/10 text-rose-400",
    RESCHEDULED: "bg-indigo-500/10 text-indigo-400",
    CLOSED: "bg-slate-500/10 text-slate-400",
  };

  const stats = [
    {
      title: "Total Sessions",
      value: interviews.length,
      icon: Video,
      color: "text-indigo-400",
    },
    {
      title: "Completed",
      value: interviews.filter((i) => i.status === "COMPLETED").length,
      icon: CheckCircle,
      color: "text-emerald-400",
    },
    {
      title: "No Show",
      value: interviews.filter((i) => i.status === "NO_SHOW").length,
      icon: XCircle,
      color: "text-rose-400",
    },
    {
      title: "Upcoming",
      value: interviews.filter(
        (i) => i.status === "PENDING" || i.status === "SCHEDULED",
      ).length,
      icon: Clock,
      color: "text-amber-400",
    },
  ];

  const isFormDisabled =
    selectedInterview?.status !== "SCHEDULED" ||
    selectedInterview?.taskAssignee !== user?.username;

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="h-8 w-8 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white">
          Interview Scheduler
        </h1>
        <p className="text-slate-400 mt-1">
          Manage candidate evaluations and session logistics
        </p>
      </div>

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

      <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
          <Calendar className="w-4 h-4 text-indigo-400" />
          <h2 className="text-sm font-bold uppercase text-slate-300">
            My Schedule
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
              <tr>
                <th className="px-6 py-4 text-left">Candidate</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Scheduled at</th>
                <th className="px-6 py-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {interviews.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#0B1220] transition cursor-pointer"
                  onClick={() => openInterviewModal(item)}
                >
                  <td className="px-6 py-5 text-slate-200 font-semibold">
                    {item.intervieweeName || item.intervieweeEmail}
                  </td>
                  <td className="px-6 py-5 text-slate-400">
                    {item.intervieweeEmail}
                  </td>
                  <td className="px-6 py-5 text-slate-400">
                    {item.scheduledAt.replace("T", " ")}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${badgeStyles[item.status]}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {user?.role === "HR_RECRUITMENT" && (
        <div className="bg-[#111827] border border-slate-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            <h2 className="text-sm font-bold uppercase text-slate-300">
              Employee Interviews
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#0B1220] text-xs uppercase text-slate-500">
                <tr>
                  <th className="px-6 py-4 text-left">Candidate</th>
                  <th className="px-6 py-4 text-left">Email</th>
                  <th className="px-6 py-4 text-left">Interviewer</th>
                  <th className="px-6 py-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {!employeeInterviews?.length ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-6 text-center text-slate-500"
                    >
                      No employee interviews found
                    </td>
                  </tr>
                ) : (
                  employeeInterviews.map((item) => (
                    <tr
                      key={item.id}
                      className="hover:bg-[#0B1220] transition cursor-pointer"
                      onClick={() => openInterviewModal(item)}
                    >
                      <td className="px-6 py-5 text-slate-200 font-semibold">
                        {item.intervieweeName || item.intervieweeEmail}
                      </td>
                      <td className="px-6 py-5 text-slate-400">
                        {item.intervieweeEmail}
                      </td>
                      <td className="px-6 py-5 text-slate-400">
                        {item.interviewerEmail}
                      </td>
                      <td className="px-6 py-5">
                        <span
                          className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${badgeStyles[item.status]}`}
                        >
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && selectedInterview && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0b1220] border border-slate-800 rounded-2xl w-full max-w-2xl p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-white">
                Interview Details
              </h3>
              <button
                onClick={closeInterviewModal}
                className="text-slate-400 hover:text-white"
              >
                <XCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-300">
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Candidate
                </p>
                <p className="font-semibold text-indigo-400 text-lg">
                  {selectedInterview.intervieweeName || "N/A"}
                </p>
                <p className="text-sm">{selectedInterview.intervieweeEmail}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Interviewer
                </p>
                <p className="font-semibold text-white">
                  {selectedInterview.interviewerEmail}
                </p>
                <p className="text-sm">
                  Role: {selectedInterview.role || "Technical Interviewer"}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Scheduled
                </p>
                <p className="font-semibold text-amber-400">
                  {formatDateTime(selectedInterview.scheduledAt)}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Meeting Link
                </p>
                <p className="font-semibold text-emerald-400 break-all text-sm underline">
                  {selectedInterview.meetingLink}
                </p>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Feedback
                </label>
                <textarea
                  disabled={isFormDisabled}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={
                    isFormDisabled
                      ? "Feedback submitted"
                      : "Enter evaluation notes..."
                  }
                  className={`w-full p-3 rounded-xl border border-slate-800 text-white focus:border-indigo-500 outline-none transition-all min-h-25 ${isFormDisabled ? "bg-slate-900/30 text-slate-500 cursor-not-allowed" : "bg-slate-900/50"}`}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-slate-500 font-bold">
                  Outcome
                </label>
                <input
                  disabled={isFormDisabled}
                  value={outcome}
                  onChange={(e) => setOutcome(e.target.value)}
                  placeholder={
                    isFormDisabled
                      ? "Outcome submitted"
                      : "e.g. Strongly Recommended"
                  }
                  className={`w-full p-3 rounded-xl border border-slate-800 text-white focus:border-indigo-500 outline-none transition-all ${isFormDisabled ? "bg-slate-900/30 text-slate-500 cursor-not-allowed" : "bg-slate-900/50"}`}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-4">
              {selectedInterview.status === "SCHEDULED" &&
                selectedInterview.taskAssignee === user.username && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleStatusUpdate("COMPLETED")}
                      disabled={actionLoading}
                      className="flex-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 py-3 rounded-xl font-bold border border-emerald-500/20 transition-all"
                    >
                      {actionLoading === "COMPLETED"
                        ? "Processing..."
                        : "Mark Completed"}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("NO_SHOW")}
                      disabled={actionLoading}
                      className="flex-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 py-3 rounded-xl font-bold border border-rose-500/20 transition-all"
                    >
                      {actionLoading === "NO_SHOW"
                        ? "Processing..."
                        : "No Show"}
                    </button>
                    <button
                      onClick={() => handleStatusUpdate("RESCHEDULED")}
                      disabled={actionLoading}
                      className="flex-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 py-3 rounded-xl font-bold border border-indigo-500/20 transition-all"
                    >
                      {actionLoading === "RESCHEDULED"
                        ? "Processing..."
                        : "Reschedule"}
                    </button>
                  </div>
                )}

              {user?.role === "HR_RECRUITMENT" &&
                selectedInterview.taskAssignee === user?.username && (
                  <div className="flex gap-2">
                    {selectedInterview.status === "RESCHEDULED" && (
                      <button
                        onClick={() => {
                          setRescheduleData({
                            taskId: selectedInterview.taskId,
                            newDate: "",
                            userName:
                              selectedInterview.intervieweeName ||
                              selectedInterview.intervieweeEmail,
                            newInterviewerEmail:
                              selectedInterview.interviewerEmail,
                          });
                          setShowRescheduleCard(true);
                        }}
                        className="flex-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 py-3 rounded-xl font-bold border border-amber-500/20 transition-all"
                      >
                        Reschedule
                      </button>
                    )}

                    {selectedInterview.status !== "SCHEDULED" &&
                      selectedInterview.status !== "CLOSED" && (
                        <button
                          onClick={() =>
                            hrCloseInterview(selectedInterview.taskId)
                          }
                          disabled={actionLoading}
                          className="flex-1 bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl font-bold transition-all"
                        >
                          {actionLoading === true
                            ? "Closing..."
                            : "Close Interview"}
                        </button>
                      )}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {showRescheduleCard && (
        <RescheduleCard
          data={rescheduleData}
          setData={setRescheduleData}
          onClose={() => setShowRescheduleCard(false)}
          onConfirm={hrRescheduleInterview}
        />
      )}
    </div>
  );
}
