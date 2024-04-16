import React from 'react';
import { Categories } from '~/libs/constants/constants';
import { AppealStatus } from '~/libs/enums/enums';
import { Status } from '../../status/status';

type Properties = {
  appealNumber: number;
  category: typeof Categories[number];
  status: keyof typeof AppealStatus
  date: string;
}

const AppealCard: React.FC<Properties> = ({
  appealNumber, 
  category, 
  status, 
  date}) => {
    return (
      <div className="appeal-card">
        <div className="appeal-card__container">
          <div className="appeal-card__number">
            Звернення<span>#{appealNumber}</span>
          </div>
          <div className="appeal-card__title">
            {category}
          </div>
          <div className="appeal-card__state">
            <Status type={status}/>
            <div className="appeal-card__date">
              {date}
            </div>
          </div>
        </div>
      </div>
    );
};

export  { AppealCard };
