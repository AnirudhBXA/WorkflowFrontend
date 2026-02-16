import { Check, X, User } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

export default function ManagerTimesheetApprovalTable({ data }) {

  async function handleApprovalTask(taskId, decision){
    try{
      const response = await axiosInstance.post(
        `/timesheets/tasks/${taskId}/complete`,
        {
          managerDecision: decision
        }
      )
    } catch(e){
      alert("failed to update the status");
      console.log(e);
    }
  }



  return (
    <div className="bg-white rounded-4xl shadow-sm border border-indigo-50 overflow-hidden">
      <div className="px-8 py-5 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
        <h3 className="font-black text-gray-800 tracking-tight flex items-center gap-2 text-sm uppercase">
          Team Approvals
        </h3>
        <span className="bg-indigo-600 text-white text-[10px] font-black px-2 py-1 rounded-md">
          {data.length} PENDING
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-[10px] font-black uppercase tracking-widest text-gray-400 bg-gray-50/50">
              <th className="px-8 py-4 text-left">Member</th>
              <th className="px-8 py-4 text-left">Hours</th>
              <th className="px-8 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {data.map((row) => (
              <tr
                key={row.timesheetId}
                className="group hover:bg-indigo-50/30 transition-colors"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-800">
                        {row.employee.name}
                      </p>
                      <p className="text-[8px] font-bold text-gray-400">
                        {row.weekStart} - {row.weekEnd}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <p className="text-sm font-black text-indigo-600">
                    {row.hoursWorked}h
                  </p>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center justify-center gap-2">
                    <button 
                      className="p-2 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"
                      onClick={(e) => {handleApprovalTask(row.taskId, "APPROVED")}}
                      >
                      <Check size={16} />
                    </button>
                    <button 
                      className="p-2 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                      onClick={(e)=> {handleApprovalTask(row.taskId, "REJECTED")}}
                      >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
