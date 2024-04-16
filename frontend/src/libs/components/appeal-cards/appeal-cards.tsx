import React from 'react';
import { AppealCard } from './components/appeal-card';

import { AppealCardsProperties } from './libs/types/types';

type Properties = {
  appeals: AppealCardsProperties[]
}

const AppealCards: React.FC<Properties> = ({appeals}) => {
  return (
    <div className='appeals-cards'>
     {
      appeals.map(appeal=>{
        return <AppealCard 
                  appealNumber={appeal.appealNumber}
                  status={appeal.status}
                  category={appeal.category}
                  date={appeal.date}
                />
      })
     }
    </div>
  );
};

export  { AppealCards };
