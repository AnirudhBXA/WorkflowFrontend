import { X, Calendar, User, ArrowRight } from "lucide-react";

export default function RescheduleCard({ data, setData, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center z-100 p-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in duration-200">
        <div className="bg-amber-500 p-8 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl hover:bg-white/20 transition-colors"
          >
            <X size={20} />
          </button>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">
            Scheduling Conflict
          </p>
          <h2 className="text-2xl font-black tracking-tight">
            Reschedule Interview
          </h2>
        </div>

        <div className="p-8 space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              Candidate ID
            </label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="text"
                value={data.userName}
                onChange={(e) => setData({ ...data, userName: e.target.value })}
                placeholder="Enter candidate name"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">
              New Proposed Date
            </label>
            <div className="relative group">
              <Calendar className="absolute left-4 top-3.5 w-4 h-4 text-gray-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                type="datetime-local"
                value={data.newDate}
                onChange={(e) => setData({ ...data, newDate: e.target.value })}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all font-medium"
              />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-4 text-sm font-bold text-gray-500 hover:bg-gray-50 rounded-2xl transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onConfirm(data)}
              className="flex-1 px-6 py-4 text-sm font-bold text-white bg-amber-500 shadow-xl shadow-amber-100 hover:bg-amber-600 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Confirm <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
