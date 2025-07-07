import Complaint from '@/components/Form/Complaint';
import React from 'react';

const Page = () => {
  return (
    <div className="h-[90vh] flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
          Submit a <span className="text-blue-600">Complaint</span>
        </h2>
        <Complaint />
      </div>
    </div>
  );
};

export default Page;
