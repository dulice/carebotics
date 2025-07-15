import React from "react";

const Error = ({ message }: { message: string }) => {
  return (
    <p className="bg-red-100 text-red-500 p-2 rounded-md m-5">{message}</p>
  );
};

export default Error;
