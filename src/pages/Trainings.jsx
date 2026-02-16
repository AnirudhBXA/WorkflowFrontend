import { useContext, useEffect, useState } from "react";
import TrainingCard from "../components/Trainings/TrainingCard";
import { BookOpen, Users, ArrowUpRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axiosInstance";

export default function TrainingsComponent() {
  // const [role] = useState("manager");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [myTrainings, setMyTrainings] = useState([]);
  const [teamTrainings, setTeamTrainings] = useState([]);

  useEffect(() => {

    // console.log(user)
    
    fetchMyTrainings();

    if(user.role === "MANAGER"){
      fetchTeamTrainings();
    }
      
  }, []);

  async function fetchMyTrainings(){
    try{
      const response = await axiosInstance.get("/trainings/me");
      setMyTrainings(response.data);
      console.log(myTrainings);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }

  async function fetchTeamTrainings(){
    try{
      const response = await axiosInstance.get("/trainings/teamTrainings");
      setTeamTrainings(response.data);
      console.log(teamTrainings);
    }
    catch(e){
      alert("failed to fetch the data");
    }
    finally{
      setLoading(false);
    }
  }

  const statusBadge = (status) => {
    const map = {
      PLANNED: "bg-indigo-50 text-indigo-700 border-indigo-100",
      ONGOING: "bg-amber-50 text-amber-700 border-amber-100",
      COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-100",
    };
    return (
      <span
        className={`px-3 py-1 rounded-lg border text-[10px] font-black uppercase tracking-wider ${map[status]}`}
      >
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-indigo-600" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 p-2">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Learning & Development
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic">
            Upskill yourself and track your team's growth
          </p>
        </div>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
          Browse Catalog <ArrowUpRight size={16} />
        </button>
      </div>

      {/* My Assigned Trainings */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <h2 className="text-xl font-bold text-gray-900 tracking-tight">
            My Assignments
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {myTrainings.map((item, index) => (
            <TrainingCard key={index} data={item} />
          ))}
        </div>
      </section>

      {/* Team Progress Section */}
      {user.role === "MANAGER" && (


        <section className="space-y-6 pt-6">
          <div className="flex items-center gap-2 px-2">
            <Users className="w-5 h-5 text-indigo-600" />
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">
              Team Progress
            </h2>
          </div>

          <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-[10px] font-black uppercase tracking-[0.15em] text-gray-400">
                    <th className="px-8 py-5 text-left">Employee</th>
                    <th className="px-8 py-5 text-left">Training Module</th>
                    <th className="px-8 py-5 text-left">Mentor</th>
                    <th className="px-8 py-5 text-left">Due Date</th>
                    <th className="px-8 py-5 text-left">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {teamTrainings.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-indigo-50/30 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-[10px] font-black text-indigo-700">
                            {item.employee.name.charAt(0)}
                          </div>
                          <span className="font-bold text-gray-900">
                            {item.employee.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-6 font-bold text-gray-700">
                        {item.trainingName}
                      </td>
                      <td className="px-8 py-6 text-gray-500 font-medium">
                        {item.trainerName}
                      </td>
                      <td className="px-8 py-6">
                        <p className="text-[11px] font-bold text-gray-400 uppercase">
                          {/* {item.startDate} <span className="mx-1">→</span>{" "}
                          {item.endDate} */}
                          {item.dueDate}
                        </p>
                      </td>
                      <td className="px-8 py-6">{statusBadge(item.status)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
