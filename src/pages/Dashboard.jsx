import StatsCards from "../components/Dashboard/StatsCards";
import ChartsSection from "../components/Dashboard/ChartSection";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0B1220] text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">
              Welcome back
            </h1>
            <p className="text-slate-400 mt-1">
              Monitor workflows, approvals and activity
            </p>
          </div>
        </div>

        <div className="space-y-10">
          <StatsCards />
          <ChartsSection />
          {/* <TasksAndCalendar /> */}
        </div>
      </div>
    </div>
  );
}
