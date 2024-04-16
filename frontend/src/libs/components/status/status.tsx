import React from 'react';
import { AppealStatus } from '~/libs/enums/enums';


type Properties = {
    type: keyof typeof AppealStatus
}

const Status: React.FC<Properties> = ({type}) => {
  return (
    <div className="appeal-status">
      <span className="appeal-status__text">{AppealStatus[type]}</span>
    </div>
  );
};

export  { Status };
