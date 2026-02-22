import { useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import axiosInstance from "../utils/axiosInstance";
import {
  Mail,
  Briefcase,
  Users,
  IdCard,
  Award,
  Calendar,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

function getSafeValue(value) {
  return value ?? "NA";
}

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [leaves, setLeaves] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [leaveSummary, setLeaveSummary] = useState({ available: 0, used: 0 });
  const [activeTab, setActiveTab] = useState("approved");

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const res = await axiosInstance.get("/profile/me");
        const { profile, leaves, certifications, leaveSummary } = res.data;
        setProfile(profile);
        setLeaves(leaves || []);
        setCertifications(certifications || []);
        setLeaveSummary(leaveSummary || { available: 0, used: 0 });
      } catch {}
    }
    fetchUserProfile();
  }, []);

  function calculateDays(from, to) {
    const start = new Date(from);
    const end = new Date(to);
    const diffTime = end.getTime() - start.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1; // inclusive
    return diffDays;
  }

  const filterLeaves = (status) => leaves.filter((l) => l.status === status);

  if (!profile) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="relative">
            <div className="w-28 h-28 rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-extrabold shadow-lg">
              {getSafeValue(profile.name).charAt(0)}
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-extrabold text-white">
              {getSafeValue(profile.name)}
            </h1>
            <p className="text-slate-400 mt-1 font-medium">{profile.email}</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-6 mt-8 pt-8 border-t border-slate-800">
              <ProfileItem
                icon={<Mail size={14} />}
                label="Username"
                value={profile.username}
              />
              <ProfileItem
                icon={<Users size={14} />}
                label="Manager"
                value={profile.manager}
              />
              <ProfileItem
                icon={<Briefcase size={14} />}
                label="HR Partner"
                value={profile.hr}
              />
              <ProfileItem
                icon={<IdCard size={14} />}
                label="Employee ID"
                value={profile.employeeId}
              />
              <ProfileItem
                icon={<ShieldCheck size={14} />}
                label="Role"
                value={profile.role}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8 space-y-8">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Calendar className="text-indigo-400" />
          Time Off Management
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          <ValuesDisplayCard
            data={{
              context: "Annual Allowance",
              value: leaveSummary.available,
              units: "Days",
            }}
          />
          <ValuesDisplayCard
            data={{
              context: "Utilized Time",
              value: leaveSummary.used,
              units: "Days",
            }}
          />
        </div>

        <div className="flex gap-2 bg-[#0B1220] rounded-xl p-1 w-fit">
          {["approved", "pending", "rejected"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 text-sm font-semibold rounded-lg capitalize transition ${
                activeTab === tab
                  ? "bg-indigo-600 text-white"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#0B1220] text-slate-500 text-xs uppercase">
              <tr>
                <th className="px-6 py-4 text-left">Period</th>
                <th className="px-6 py-4 text-left">Duration</th>
                <th className="px-6 py-4 text-left">Reason</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filterLeaves(activeTab).length ? (
                filterLeaves(activeTab).map((l) => (
                  <tr key={l.id} className="hover:bg-[#0B1220] transition">
                    <td className="px-6 py-4 text-slate-200 font-medium">
                      {l.from} <span className="mx-2 text-slate-600">→</span>{" "}
                      {l.to}
                    </td>
                    <td className="px-6 py-4 text-indigo-400 font-semibold">
                      {" "}
                      {calculateDays(l.from, l.to)} Days{" "}
                    </td>
                    <td className="px-6 py-4 text-slate-400 truncate max-w-xs">
                      {l.reason}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No {activeTab} requests found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-[#111827] border border-slate-800 rounded-2xl p-8">
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Award className="text-indigo-400" />
          Certifications
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-4 rounded-xl border border-slate-800 hover:bg-[#0B1220] transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-sm font-bold text-white">{cert.title}</h3>
                  <p className="text-xs text-slate-400 uppercase mt-1">
                    {cert.provider}
                  </p>
                </div>
                <ChevronRight className="text-slate-500" size={16} />
              </div>

              <div className="mt-4 flex justify-between text-xs uppercase text-slate-500 font-semibold">
                <span>Issued</span>
                <span className="text-slate-300">{cert.date}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-indigo-400 mt-1">{icon}</div>
      <div>
        <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">
          {label}
        </p>
        <p className="text-sm font-semibold text-slate-200 break-all">
          {value ?? "NA"}
        </p>
      </div>
    </div>
  );
}
