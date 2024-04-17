import React from 'react';
import { AppealCards } from '~/libs/components/appeal-cards/appeal-cards';

import { SearchInput } from '~/libs/components/search/search';

import { mockAppeals } from '~/libs/components/appeal-cards/libs/constants/constants';

import map from '~/assets/images/map.png';

const Appeals: React.FC = () => {
  return (
    <div className='appeals'>
      <div className="appeals__container _container">
        <div className="appeals__content">
          <div className="appeals__search">
            <SearchInput 
              defaultValue='' 
              placeholder='Пошук за назвою або номером звернення' 
              onValueChange={(str)=>console.log(str)}
              onButtonClick={()=>{}}
            />
          </div>
          <div className="appeals__cards">
            <AppealCards appeals={mockAppeals}/>
          </div>
          
        </div>
        <div className="appeals__map">
          <img src={map} alt="" />
        </div>
      </div>
     
    </div>
  );
};

export { Appeals };