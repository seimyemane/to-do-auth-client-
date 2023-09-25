import React, { useState } from "react";

const ErrorLayout = ({ data }) => {
  return (
    <span className="absolute h-fit w-fit flex justify-center items-center p-4 text-red-500 bg-slate-700 rounded-2xl bg-opacity-90 flex-col">
      {data.message}
      <button
        className="text-red-600 bg-white rounded-md p-1"
        onClick={() => !data.status}
      >
        Close
      </button>
    </span>
  );
};

export default ErrorLayout;
