import { useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import axiosInstance from "../utils/axiosInstance";
import {
  User,
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
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    }
    fetchUserProfile();
  }, []);

  const filterLeaves = (status) => leaves.filter((l) => l.status === status);

  if (!profile) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 p-8">
      {/* HEADER / PROFILE SECTION */}
      <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar with Ring */}
          <div className="relative">
            <div className="w-28 h-28 rounded-3xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg shadow-indigo-100">
              {getSafeValue(profile.name).charAt(0)}
            </div>
            <div
              className="absolute -bottom-2 -right-2 bg-emerald-500 border-4 border-white w-8 h-8 rounded-full shadow-sm"
              title="Active Account"
            ></div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <h1 className="text-3xl font-extrabold text-gray-900">
                {getSafeValue(profile.name)}
              </h1>
            </div>
            <p className="text-lg text-gray-500 mt-1 font-medium">
              Senior Software Engineer —{" "}
              <span className="text-indigo-600">
                {getSafeValue(profile.department)}
              </span>
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-12 mt-8 pt-8 border-t border-gray-100">
              <ProfileItem
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                value={profile.email}
              />
              <ProfileItem
                icon={<Users className="w-4 h-4" />}
                label="Manager"
                value={profile.manager}
              />
              <ProfileItem
                icon={<Briefcase className="w-4 h-4" />}
                label="HR Partner"
                value={profile.hr}
              />
              <ProfileItem
                icon={<IdCard className="w-4 h-4" />}
                label="Employee ID"
                value={profile.employeeId}
              />
              <ProfileItem
                icon={<ShieldCheck className="w-4 h-4" />}
                label="Role"
                value="Technical Lead"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-1 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-indigo-600" />
                Time Off Management
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <ValuesDisplayCard
                data={{
                  context: "Annual Allowance",
                  value: leaveSummary.available,
                  units: "Days Left",
                }}
                className="bg-indigo-50/50 border-none"
              />
              <ValuesDisplayCard
                data={{
                  context: "Utilized Time",
                  value: leaveSummary.used,
                  units: "Days Taken",
                }}
              />
            </div>

            <div className="flex gap-2 p-1.5 bg-gray-50 rounded-xl mb-6 w-fit">
              {["approved", "pending", "rejected"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2 text-sm font-bold rounded-lg capitalize transition-all ${
                    activeTab === tab
                      ? "bg-white text-indigo-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-100">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50/50 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
                    <th className="px-6 py-4 text-left">Period</th>
                    <th className="px-6 py-4 text-left">Duration</th>
                    <th className="px-6 py-4 text-left">Reason</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filterLeaves(activeTab).length > 0 ? (
                    filterLeaves(activeTab).map((l) => (
                      <tr
                        key={l.id}
                        className="hover:bg-indigo-50/30 transition-colors group"
                      >
                        <td className="px-6 py-4">
                          <span className="font-semibold text-gray-700">
                            {l.from}
                          </span>
                          <span className="mx-2 text-gray-300">→</span>
                          <span className="font-semibold text-gray-700">
                            {l.to}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-indigo-600">
                          {l.days} Days
                        </td>
                        <td className="px-6 py-4 text-gray-500 max-w-50 truncate">
                          {l.reason}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="3"
                        className="px-6 py-12 text-center text-gray-400 font-medium"
                      >
                        No {activeTab} requests found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl shadow-sm border border-indigo-50 p-8 h-full">
            <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-600" />
              Certifications
            </h2>
            <div className="space-y-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certifications.map((cert) => (
                <div
                  key={cert.id}
                  className="group p-4 rounded-2xl border-2 border-gray-100 hover:border-indigo-200 hover:bg-indigo-50/20 transition-all cursor-default"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-gray-400 font-medium mt-1 uppercase tracking-tight">
                        {cert.provider}
                      </p>
                    </div>
                    <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors text-indigo-600">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase">
                    <span>Issued</span>
                    <span className="text-gray-900">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-indigo-400">{icon}</div>
      <div>
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">
          {label}
        </p>
        <p className="text-sm font-bold text-gray-800 break-all leading-tight">
          {value ?? "NA"}
        </p>
      </div>
    </div>
  );
}