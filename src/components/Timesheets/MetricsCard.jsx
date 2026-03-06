export default function MetricsCard({ title, value }) {
  return (
    <div className="bg-[#111827] border border-slate-800 rounded-xl p-6 flex flex-col items-center">
      <h3 className="text-sm font-medium text-slate-400">{title}</h3>
      <p className="text-2xl font-bold text-white mt-2">{value}</p>
    </div>
  );
}
