import Request from "@/components/Form/Request";
import React from "react";

const page = () => {
  return (
    <div className="flex justify-center items-center  w-full h-[90vh] bg-gradient-to-b from-gray-50 to-white">
      <div className="border rounded-lg bg-white shadow-2xl flex  justify-center items-center p-4">
        <div className="flex flex-col gap-7 items-center m-5">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Submit a <span className="text-blue-600">Service Request</span>
          </h2>
          <Request />
        </div>
        {/* <div className="w-[30vw] bg-gradient-to-b from-blue-600 via-blue-500 to-blue-400 h-full rounded-r-xl p-6 flex justify-center items-center shadow-lg hover:shadow-2xl transition-all duration-300">
          <p className="font-semibold italic text-lg text-white leading-relaxed text-center">
            Your needs are our priority. Whether it's a small repair or a
            critical service request, we are here to help. Submit your request,
            and our trusted professionals will take care of the rest—quickly,
            reliably, and with care.
          </p>
        </div> */}
      </div>
    </div>
  );
};

export default page;
