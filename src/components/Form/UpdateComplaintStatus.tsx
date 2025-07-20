import React from "react";
import { handleComplaintStatus } from "../Admin/action";

export default function UpdateComplaintStatus({
  complaintId,
  currentStatus,
}: {
  complaintId: number;
  currentStatus: string;
}) {
  return (
    <form action={handleComplaintStatus} className="flex gap-2 w-full justify-center">
      <input type="hidden" name="complaintId" value={complaintId}/>
      <select
        name="currentStatus"
        defaultValue={currentStatus}
        className="border rounded px-2 py-1"
      >
        <option value="pending">Pending</option>
        <option value="ongoing">Ongoing</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
      >
        Update
      </button>
    </form>
  );
}
