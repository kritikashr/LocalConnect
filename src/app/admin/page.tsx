import RecentComplaints from "@/components/Table/complaint";
import RecentRequest from "@/components/Table/request";
import RecentUsers from "@/components/Table/user";
import {
  getCompletedComplaintsCount,
  getProviderCount,
  getRequestCount,
  getUserSession,
  getUserStats,
} from "@/lib/api";
import React, { use } from "react";

const page = async () => {
  const session = await getUserSession();
  const token = session?.accessToken as string | undefined;

  const completedCount = await getCompletedComplaintsCount(token);
  const userStats = await getUserStats(token);
  const providerCount = await getProviderCount(token);
  const requestCount = await getRequestCount(token);

  return (
    <div className="flex flex-col  gap-8 p-8">
      {/* Left Sidebar */}
      <div className="flex flex-col w-full gap-8">
        <div className="bg-gray-200 shadow-lg rounded-lg p-6">
          <h3 className="text-xl font-bold">Welcome, Admin!</h3>
          <p className="text-gray-600">
            All systems operational. 2 new critical alerts.
          </p>
        </div>
        <div className="bg-gray-200 shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-semibold">Quick Stats</h3>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">{userStats.citizens}</p>
              <p className="text-sm text-gray-500">Active Users</p>
            </div>
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">{requestCount}</p>
              <p className="text-sm text-gray-500">Pending Requests</p>
            </div>
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">
                {completedCount.toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">Resolved Complaints</p>
            </div>
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">{providerCount}</p>
              <p className="text-sm text-gray-500">Active Provider</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex  w-full  gap-8">
        <div className="w-full flex flex-col gap-8">
          <div className="bg-gray-200 shadow-lg rounded-lg p-6">
            <RecentComplaints />
          </div>
          <div className="bg-gray-200 shadow-lg rounded-lg p-6 ">
            <RecentRequest />
          </div>
          <div className="bg-gray-200 shadow-lg rounded-lg p-6 ">
            <RecentUsers />
          </div>
        </div>

        {/* <div className="flex flex-col gap-8">
          Quick Actions
          <div className="bg-gray-200 shadow-lg rounded-lg p-6 ">
            <h3 className="text-lg font-semibold">Quick Actions</h3>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <button className="bg-blue-500 text-white p-3 rounded">
                Add New User
              </button>
              <button className="bg-green-500 text-white p-3 rounded">
                Create New Complaint
              </button>
              <button className="bg-gray-500 text-white p-3 rounded">
                Generate Monthly Report
              </button>
              <button className="bg-purple-500 text-white p-3 rounded">
                Broadcast Message
              </button>
            </div>
          </div>

          Recent Activity
          <div className="bg-gray-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold">Recent Activity</h3>
            <div className="mt-4">
              <p className="text-sm text-gray-500 mt-2">
                New complaint COMP008 submitted.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                User Jane Doe updated their profile.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Service Request RE0001 has been received.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                New complaint COMP002 submitted.
              </p>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default page;
