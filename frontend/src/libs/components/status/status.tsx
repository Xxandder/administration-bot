import React from 'react';
import { AppealStatuses } from '~/libs/enums/enums';


type Properties = {
    type: keyof typeof AppealStatuses
}

const Status: React.FC<Properties> = ({type}) => {
  return (
    <div className="appeal-status">
      <span className="appeal-status__text">{AppealStatuses[type]}</span>
    </div>
  );
};

export  { Status };
