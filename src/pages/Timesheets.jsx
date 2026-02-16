import { useContext, useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import WeeklyHoursChart from "../components/Timesheets/WeeklyHoursChart";
import MonthlyTimesheetTable from "../components/Timesheets/MonthlyTimesheetTable";
import ManagerTimesheetApprovalTable from "../components/Timesheets/ManagerTimesheetApprovalTable";
import { Clock, BarChart3, ListChecks } from "lucide-react";
import { AuthContext } from "../context/AuthContext";

export default function TimesheetsComponent() {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [ myTimesheets, setMyTimesheets ] = useState([]);
  const [weeklyData, setWeeklyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [teamTimesheets, setTeamTimesheets] = useState([]);

  useEffect(() => {

    fetchMyTimesheets();
    fetchMyMonthReport();

    if(user.role === "MANAGER"){
      fetchTeamTimesheets();
    }

    // setTimeout(() => {
    //   setWeeklyData([
    //     { day: "Mon", hours: 8 },
    //     { day: "Tue", hours: 7 },
    //     { day: "Wed", hours: 6 },
    //     { day: "Thu", hours: 8 },
    //     { day: "Fri", hours: 5 },
    //   ]);
    //   setMonthlyData([
    //     { week: "Week 1", hours: 38, status: "Approved" },
    //     { week: "Week 2", hours: 40, status: "Approved" },
    //     { week: "Week 3", hours: 36, status: "Pending" },
    //   ]);
    //   setTeamTimesheets([
    //     { id: 1, employee: "John Doe", week: "Week 3", hours: 35 },
    //     { id: 2, employee: "Jane Smith", week: "Week 3", hours: 40 },
    //   ]);
    //   setLoading(false);
    // }, 1000);
  }, []);

  async function fetchMyTimesheets(){
    try{
      const response = await axiosInstance.get("/timesheets/me");
      setMyTimesheets(response.data);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }
  
  async function fetchMyMonthReport(){
    try{
      const response = await axiosInstance.get("/timesheets/this-month");
      setMonthlyData(response.data);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }
  
  async function fetchTeamTimesheets(){
    try{
      const response = await axiosInstance.get("/timesheets/team");
      setTeamTimesheets(response.data);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600" />
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto space-y-10 p-2">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Timesheet <span className="text-indigo-600">Reports</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic">
            Log and monitor professional working hours
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-indigo-50 px-4 py-2 rounded-xl flex items-center gap-3">
            <Clock className="text-indigo-600 w-5 h-5" />
            <div>
              <p className="text-[10px] font-black text-indigo-400 uppercase leading-none">
                Total Hours (Week)
              </p>
              <p className="text-lg font-black text-indigo-700 leading-none mt-1">
                34.0 hrs
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Chart Card */}
      <div className="bg-white rounded-4xl p-8 shadow-sm border border-indigo-50 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-8 relative z-10">
          <BarChart3 className="text-indigo-600 w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            Performance Analytics
          </h2>
        </div>
        <WeeklyHoursChart data={weeklyData} />
      </div>

      {/* Tables Section */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        <MonthlyTimesheetTable data={monthlyData} />

        {user.role === "MANAGER" && (
          <ManagerTimesheetApprovalTable data={teamTimesheets} />
        )}
      </div>
    </div>
  );
}
