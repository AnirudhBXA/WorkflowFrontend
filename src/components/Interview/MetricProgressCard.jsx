export default function MetricProgressCard({ title, value, Icon, iconColor }) {
  const percentage = Math.min(value * 10, 100);

  return (
    <div className="bg-white p-6 rounded-3xl border border-indigo-50 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 bg-gray-50 rounded-2xl ${iconColor}`}>
          {Icon && <Icon size={20} />}
        </div>
        <span className="text-[10px] font-black text-gray-300 tracking-widest uppercase">
          Live
        </span>
      </div>

      <div>
        <p className="text-sm font-bold text-gray-500">{title}</p>
        <h3 className="text-3xl font-black text-gray-900 tracking-tight mt-1">
          {value}
        </h3>
      </div>

      <div className="mt-6 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 bg-indigo-600`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
