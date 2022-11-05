import React from 'react';

interface ResponseProps {
  isValid: boolean;
  children: string;
}

const Response = ({isValid, children}: ResponseProps) => {
  return <div className={`${isValid ? 'bg-rose-500' : 'bg-sky-300'} text-white font-bold p-4 my-10 rounded-lg text-center`}>{children}</div>;
};

export default Response;

