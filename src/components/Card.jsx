import React from 'react';

const Card = ({ icon: Icon, backgroundColor, amount, description,to }) => {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg border">
      <div className={`flex-shrink-0 p-3 rounded-full ${backgroundColor}`}>
        <Icon className="h-6 w-6 text-blue-500" aria-hidden="true" />
      </div>
      <div className="ml-4">
        <div className="text-2xl font-bold">{amount}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
    </div>
  );
};

export default Card;
