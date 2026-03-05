import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import WeeklyHoursChart from "../components/Timesheets/WeeklyHoursChart";
import MonthlyTimesheetTable from "../components/Timesheets/MonthlyTimesheetTable";
import ManagerTimesheetApprovalTable from "../components/Timesheets/ManagerTimesheetApprovalTable";
import { BarChart3 } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "sonner";
import MetricsCard from "../components/Timesheets/MetricsCard";

export default function TimesheetsComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [yearlyTotal, setYearlyTotal] = useState(0);
  const [allTimeTotal, setAllTimeTotal] = useState(0);
  const [teamTimesheets, setTeamTimesheets] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const fetchAll = async () => {
    setLoading(true);
    await Promise.all([
      fetchSummary(),
      fetchMyMonthReport(),
      user.role === "MANAGER" ? fetchTeamTimesheets() : null,
    ]);
  };

  useEffect(() => {
    fetchSummary();
    fetchMyMonthReport();
    if (user.role === "MANAGER") {
      fetchTeamTimesheets();
    }
  }, []);

  const fetchSummary = async () => {
    try {
      const res = await axiosInstance.get("/data/timesheets/summary");
      setWeeklyData(res.data.weekly || []);
      setMonthlyTotal(res.data.monthly || 0);
      setYearlyTotal(res.data.yearly || 0);
      setAllTimeTotal(res.data.allTime || 0);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch timesheet summary",
      );
    } finally {
      setLoading(false);
    }
  };

  async function fetchMyMonthReport() {
    try {
      const response = await axiosInstance.get("/timesheets/this-month");
      setMonthlyData(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch your timesheets",
      );
    } finally {
      setLoading(false);
    }
  }

  async function fetchTeamTimesheets() {
    try {
      const response = await axiosInstance.get("/timesheets/team");
      setTeamTimesheets(response.data);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch team timesheets",
      );
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

      {/* Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <MetricsCard
          title="Total Time Worked (Month)"
          value={`${monthlyTotal} hrs`}
        />
        <MetricsCard title="Yearly Time Spent" value={`${yearlyTotal} hrs`} />
        <MetricsCard title="All Time Worked" value={`${allTimeTotal} hrs`} />
        <MetricsCard
          title="Avg Weekly Hours"
          value={
            weeklyData.length
              ? (
                  weeklyData.reduce((sum, d) => sum + d.actual, 0) /
                  weeklyData.length
                ).toFixed(1) + " hrs"
              : "0 hrs"
          }
        />
      </div>

      {/* Weekly Chart */}
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
        <div className="flex items-center gap-2 mb-6">
          <BarChart3 className="text-indigo-400 w-5 h-5" />
          <h2 className="text-lg font-bold text-white">Weekly Time Spent</h2>
        </div>
        <WeeklyHoursChart data={weeklyData} />
      </div>

      {/* Monthly + Manager Tables */}
      <div className="grid lg:grid-cols-1 gap-8 items-start">
        <MonthlyTimesheetTable data={monthlyData} />

        {user.role === "MANAGER" && (
          <ManagerTimesheetApprovalTable
            data={teamTimesheets}
            onActionComplete={fetchAll}
          />
        )}
      </div>
    </div>
  );
}
