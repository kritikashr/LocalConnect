import Complaint from '@/components/Form/Complaint';
import React from 'react';

const Page = () => {
  return (
    <div className="h-[90vh] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-gray-100  rounded-2xl shadow-lg p-6">
        <h1 className="text-[26px] font-semibold text-gray-800 mb-6 text-center">
          Submit a Complaint
        </h1>
        <Complaint />
      </div>
    </div>
  );
};

export default Page;
