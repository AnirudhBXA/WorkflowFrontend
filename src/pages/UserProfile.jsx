import { useEffect, useState } from "react";
import ValuesDisplayCard from "../components/ValuesDisplayCard";
import axiosInstance from "../utils/axiosInstance";

function getSafeValue(value) {
  return value ?? "NA";
}

export default function UserProfile() {
  const [profile, setProfile] = useState([]);
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
        setLeaves(leaves);
        setCertifications(certifications);
        setLeaveSummary(leaveSummary);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      }
    }
    fetchUserProfile();
  }, []);

  const filterLeaves = (status) => leaves.filter((l) => l.status === status);

  if (!profile) return null;

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6">
      {/* PROFILE CARD */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-6 border-b border-gray-200 dark:border-gray-700 pb-6">
          <div className="w-20 h-20 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center text-indigo-700 dark:text-indigo-300 text-2xl font-semibold">
            {getSafeValue(profile.name).charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {getSafeValue(profile.name)}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Software Engineer
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <ProfileField label="Email" value={getSafeValue(profile.email)} />
          <ProfileField
            label="Department"
            value={getSafeValue(profile.department)}
          />
          <ProfileField label="Manager" value={getSafeValue(profile.manager)} />
          <ProfileField label="HR" value={getSafeValue(profile.hr)} />
          <ProfileField
            label="Employee ID"
            value={getSafeValue(profile.employeeId)}
          />
        </div>
      </div>

      {/* LEAVES */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 space-y-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Leave Summary
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <ValuesDisplayCard
            data={{
              context: "Available Leaves",
              value: getSafeValue(leaveSummary.available),
              units: "days",
            }}
          />
          <ValuesDisplayCard
            data={{
              context: "Leaves Used",
              value: getSafeValue(leaveSummary.used),
              units: "days",
            }}
          />
        </div>

        {/* Tabs */}
        <div>
          <div className="flex gap-4 border-b border-gray-200 dark:border-gray-700 mb-4">
            {["approved", "rejected", "pending"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium capitalize border-b-2 transition ${
                  activeTab === tab
                    ? "border-indigo-600 text-indigo-600 dark:text-indigo-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3 text-left">From</th>
                  <th className="px-6 py-3 text-left">To</th>
                  <th className="px-6 py-3 text-left">Days</th>
                  <th className="px-6 py-3 text-left">Reason</th>
                </tr>
              </thead>
              <tbody>
                {filterLeaves(activeTab).map((l) => (
                  <tr
                    key={l.id}
                    className="border-t border-gray-200 dark:border-gray-700"
                  >
                    <td className="px-6 py-4">{getSafeValue(l.from)}</td>
                    <td className="px-6 py-4">{getSafeValue(l.to)}</td>
                    <td className="px-6 py-4">{getSafeValue(l.days)}</td>
                    <td className="px-6 py-4">{getSafeValue(l.reason)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CERTIFICATIONS */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
          Certifications
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="p-5 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-md transition hover:-translate-y-1"
            >
              <h3 className="text-md font-semibold text-gray-900 dark:text-white">
                {getSafeValue(cert.title)}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {getSafeValue(cert.provider)}
              </p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                Completed: {getSafeValue(cert.date)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-base font-medium text-gray-900 dark:text-white">
        {value ?? "NA"}
      </p>
    </div>
  );
}
