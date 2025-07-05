import React from "react";

const page = () => {
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
              <p className="text-xl font-bold">2,450</p>
              <p className="text-sm text-gray-500">Active Users</p>
            </div>
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">189</p>
              <p className="text-sm text-gray-500">Pending Requests</p>
            </div>
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">7,890</p>
              <p className="text-sm text-gray-500">Resolved Complaints</p>
            </div>
            <div className="border bg-white shadow-lg rounded-lg h-[15vh] flex flex-col items-center justify-center">
              <p className="text-xl font-bold">45</p>
              <p className="text-sm text-gray-500">New Service Tickets</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex  w-full  gap-8">
        <div className="w-3/4 flex flex-col gap-8">
          <div className="bg-gray-200 shadow-lg rounded-lg p-6 ">
            <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Request ID</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Assigned To</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Priority</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">RE0001</td>
                    <td className="px-4 py-2">Support</td>
                    <td className="px-4 py-2">Alice Smith</td>
                    <td className="px-4 py-2 text-yellow-500">Pending</td>
                    <td className="px-4 py-2 text-yellow-500">Medium</td>
                    <td className="px-4 py-2">Details</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-200 shadow-lg rounded-lg p-6 ">
            <h3 className="text-lg font-semibold mb-4">
              Recent Service Requests
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Request ID</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Assigned To</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Priority</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">RE0001</td>
                    <td className="px-4 py-2">Support</td>
                    <td className="px-4 py-2">Alice Smith</td>
                    <td className="px-4 py-2 text-yellow-500">Pending</td>
                    <td className="px-4 py-2 text-yellow-500">Medium</td>
                    <td className="px-4 py-2">Details</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-gray-200 shadow-lg rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Complaints</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-2 text-left">Request ID</th>
                    <th className="px-4 py-2 text-left">Type</th>
                    <th className="px-4 py-2 text-left">Assigned To</th>
                    <th className="px-4 py-2 text-left">Status</th>
                    <th className="px-4 py-2 text-left">Priority</th>
                    <th className="px-4 py-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2">RE0001</td>
                    <td className="px-4 py-2">Support</td>
                    <td className="px-4 py-2">Alice Smith</td>
                    <td className="px-4 py-2 text-yellow-500">Pending</td>
                    <td className="px-4 py-2 text-yellow-500">Medium</td>
                    <td className="px-4 py-2">Details</td>
                  </tr>
                  {/* Add more rows as needed */}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Quick Actions */}
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

          {/* Recent Activity */}
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
        </div>
      </div>
    </div>
  );
};

export default page;
