import React from 'react';
function StatsCard({ label, value, icon, tag }) {
  return (
    <div className="bg-white rounded-2xl md:rounded-[22px] border border-gray-100/90 shadow-sm p-6 sm:p-7 flex flex-col justify-between hover:border-gray-200 transition-all duration-200">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold tracking-wide text-gray-500 uppercase">
          {label}
        </span>
        {icon && (
          <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-600 border border-gray-100">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-4 flex items-baseline justify-between">
        <span className="text-3xl sm:text-4xl md:text-[40px] font-extrabold text-gray-900 tracking-tight font-mono tabular-nums leading-none">
          {value}
        </span>
        {tag && (
          <span className="text-xs font-medium text-gray-400">
            {tag}
          </span>
        )}
      </div>
    </div>
  );
}
export default StatsCard;