import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import MetricProgressCard from "../components/MetricProgressCard";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import WorkHoursChart from "../components/Dashboard/WorkHoursChart";

function DashboardComponent() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        const res = await axiosInstance.get("/dashboard/summary");
        setDashboardData(res.data);
      } catch (err) {
        console.log("Using dummy dashboard data");
        setDashboardData(dummyData);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  const dummyData = {
    workHours: [
      { day: "Mon", value: 8 },
      { day: "Tue", value: 7.5 },
      { day: "Wed", value: 6 },
      { day: "Thu", value: 8.2 },
      { day: "Fri", value: 5 },
      { day: "Sat", value: 4 },
      { day: "Sun", value: 0 },
    ],
    interviews: 5,
    leaves: {
      available: 5,
      used: 3,
    },
  };

  if (loading) {
    return <div className="p-6 text-gray-500">Loading dashboard...</div>;
  }

  const data = dashboardData || dummyData;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800">
        Dashboard Overview
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ValuesDisplayCard
          data={{
            context: "Available Leaves",
            color: "bg-green-100 text-green-700",
            value: data.leaves.available,
            units: "days",
          }}
        />
        <ValuesDisplayCard
          data={{
            context: "Leaves Used",
            color: "bg-red-100 text-red-700",
            value: data.leaves.used,
            units: "days",
          }}
        />
        <MetricProgressCard title="Interviews" value={data.interviews} />
      </div>

      {/* CHART SECTION */}
      <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
        <h2 className="text-lg font-medium text-gray-700 mb-4">
          Weekly Work Hours
        </h2>
        <WorkHoursChart data={data.workHours} />
      </div>
    </div>
  );
}

export default DashboardComponent;
