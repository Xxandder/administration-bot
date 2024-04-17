import React from 'react';
import { AppealCards } from '~/libs/components/appeal-cards/appeal-cards';

import { SearchInput } from '~/libs/components/search/search';

import { mockAppeals } from '~/libs/components/appeal-cards/libs/constants/constants';

import map from '~/assets/images/map.png';

import styles from './styles.module.scss';

import { getValidClassNames } from '~/libs/helpers/get-valid-class-names.helper';

const Appeals: React.FC = () => {
  return (
    <div className={styles['appeals']}>
      <div className={getValidClassNames(styles["appeals__container"], "_container")}>
        <div className={styles["appeals__content"]}>
          <div className={styles["appeals__search"]}>
            <SearchInput 
              defaultValue='' 
              placeholder='Пошук за назвою або номером звернення' 
              onValueChange={(str)=>console.log(str)}
              onButtonClick={()=>{}}
            />
          </div>
          <div className={styles["appeals__cards"]}>
            <AppealCards appeals={mockAppeals}/>
          </div>
          
        </div>
        <div className={getValidClassNames(
          styles["appeals__map"],
          '_ibg'
          )}>
          <img src={map} alt="" />
        </div>
      </div>
     
    </div>
  );
};

export { Appeals };