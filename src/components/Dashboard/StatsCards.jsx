"use client";

import { useDataListStyles } from "@chakra-ui/react";
import { Users, CheckCircle, Clock, Calendar, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const statsData = [
  {
    title: "Subordinates",
    value: "8",
    icon: Users,
    bgColor: "bg-blue-50 dark:bg-blue-950",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-l-blue-500",
  },
  {
    title: "Tasks",
    value: "12",
    icon: CheckCircle,
    bgColor: "bg-green-50 dark:bg-green-950",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-l-green-500",
  },
  {
    title: "Hours This Week",
    value: "38.5",
    icon: Clock,
    bgColor: "bg-purple-50 dark:bg-purple-950",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-l-purple-500",
    unit: "hrs",
  },
  {
    title: "Interviews",
    value: "5",
    icon: Zap,
    bgColor: "bg-orange-50 dark:bg-orange-950",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-l-orange-500",
  },
];

export default function StatsCards() {

  const interviewApi = "/api/interview/me";
  const timesheetApi = "/api/timesheets/me"
  const leaveApi = "/api/leaves/me";
  const subordinatesCountApi = "/api/users/subordinates-count";

  const [interviewData, setInterviewData] = useState({})
  const [timesheetData, setTimesheetData] = useState({})
  const [leavesData, setLeavesData] = useState({})
  // const []

  // useEffect( async () => {

  // },[])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsData.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className={`flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 cursor-pointer border-l-4 ${stat.borderColor} p-4`}
          >
            {/* Left Icon */}
            <div className={`p-3 rounded-md ${stat.bgColor} shrink-0`}>
              <Icon className={`w-5 h-5 ${stat.textColor}`} />
            </div>

            {/* Right Content */}
            <div className="flex flex-col leading-tight">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <div className="flex items-baseline gap-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </h3>
                {stat.unit && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.unit}
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
