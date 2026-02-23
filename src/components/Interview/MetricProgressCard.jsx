export default function MetricProgressCard({ title, value, Icon, iconColor }) {
  const percentage = Math.min(value * 10, 100);

  return (
    <div className="bg-[#111827] border border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-lg hover:shadow-black/30 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 rounded-xl bg-[#0B1220]">
          {Icon && <Icon size={20} className={iconColor} />}
        </div>
        <span className="text-[10px] font-bold text-slate-500 tracking-widest uppercase">
          Live
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-400">{title}</p>
        <h3 className="text-3xl font-extrabold text-white tracking-tight mt-1">
          {value}
        </h3>
      </div>

      <div className="mt-6 h-1.5 bg-[#0B1220] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full bg-indigo-500 transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
