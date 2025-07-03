import Request from "@/components/Form/Request";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center  w-full h-[90vh]">
      <div className="border rounded bg-gray-100 flex  justify-center items-center">
        <div className="flex flex-col gap-10 items-center m-5">
          <h3>Submit a Service Request</h3>
          <Request />
        </div>
        <div className="w-[25vw] bg-gradient-to-b from-gray-200 via-gray-300 to-gray-500 h-[76vh] rounded flex justify-center items-center">
          <p className="font-semibold italic text-xl leading-11 m-5">
            Your needs are our priority. Whether it's a small repair or a
            critical service request, we are here to help. Submit your request,
            and our trusted professionals will take care of the rest—quickly,
            reliably, and with care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
