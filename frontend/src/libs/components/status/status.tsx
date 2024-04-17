import React from 'react';
import { AppealStatus } from '~/libs/enums/enums';
import { getValidClassNames } from '~/libs/helpers/helpers';

import styles from './styles.module.scss';
import { AppealStatusName } from './libs/enums/enums';

type Properties = {
    type: keyof typeof AppealStatus
}

const Status: React.FC<Properties> = ({type}) => {
  return (
    <div className={getValidClassNames(
        styles['appeal-status'],
        styles[`appeal-status_${AppealStatusName[type]}`]
    )}>
      <span className={styles["appeal-status__text"]}>{AppealStatus[type]}</span>
    </div>
  );
};

export  { Status };
