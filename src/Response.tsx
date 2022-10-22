import React from 'react';
import {ResType} from './App';

interface Props {
  res: ResType;
}

const Response = ({res}: Props) => {
  return (
    <div className={`${res === 'Neexistující email' ? 'bg-rose-500' : 'bg-sky-300'} text-white font-bold p-4 my-10 rounded-lg text-center`}>
      {res}
    </div>
  );
};

export default Response;

