import React from 'react';

const DashboardContent = ({ title, summary }) => {
  return (
    <div className="p-8">
      <h2 className="mb-8 font-bold text-blue-700 text-center text-3xl">{title}</h2>
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center">
        {summary?.map((item) => (
          <div key={item.label} className="rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 bg-white flex flex-col items-center p-6">
            <span className="text-2xl font-semibold mb-2">{item.value}</span>
            <span className="text-gray-600">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardContent; 