import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import WeeklyHoursChart from "../components/Timesheets/WeeklyHoursChart";
import MonthlyTimesheetTable from "../components/Timesheets/MonthlyTimesheetTable";
import ManagerTimesheetApprovalTable from "../components/Timesheets/ManagerTimesheetApprovalTable";
import { BarChart3 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function TimesheetsComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [teamTimesheets, setTeamTimesheets] = useState([]);

  useEffect(() => {
    fetchWeeklySummary();
    fetchMyMonthReport();
    if (user.role === "MANAGER") {
      fetchTeamTimesheets();
    }
  }, []);

  const fetchWeeklySummary = async () => {
    try {
      const res = await axiosInstance.get("/data/timesheets/summary");
      setWeeklyData(res.data.weekly || []);
    } finally {
      setLoading(false);
    }
  };

  async function fetchMyMonthReport() {
    try {
      const response = await axiosInstance.get("/timesheets/this-month");
      setMonthlyData(response.data);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeamTimesheets() {
    try {
      const response = await axiosInstance.get("/timesheets/team");
      setTeamTimesheets(response.data);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="h-10 w-10 border-t-4 border-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Timesheet Reports
        </h1>
        <p className="text-slate-400 mt-1">
          Log and monitor professional working hours
        </p>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-indigo-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white">
            Weekly Time Spent
          </h2>
        </div>
        <WeeklyHoursChart data={weeklyData} />
      </div>

      <div className="grid lg:grid-cols-1 gap-8 items-start">
        <MonthlyTimesheetTable data={monthlyData} />

        {user.role === "MANAGER" && (
          <ManagerTimesheetApprovalTable data={teamTimesheets} />
        )}
      </div>
    </div>
  );
}
