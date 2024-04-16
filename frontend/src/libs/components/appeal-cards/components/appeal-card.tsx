import React from 'react';
import { Categories } from '~/libs/constants/constants';
import { AppealStatus } from '~/libs/enums/enums';
import { Status } from '../../status/status';

import styles from './styles.module.scss';

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
      <div className={styles["appeal-card"]}>
        <div className={styles["appeal-card__container"]}>
          <div className={styles["appeal-card__number"]}>
            Звернення<span> #{appealNumber}</span>
          </div>
          <div className={styles["appeal-card__title"]}>
            {category}
          </div>
          <div className={styles["appeal-card__state"]}>
            <Status type={status}/>
            <div className={styles["appeal-card__date"]}>
              {date}
            </div>
          </div>
        </div>
      </div>
    );
};

export  { AppealCard };
