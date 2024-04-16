import React from 'react';

import { Header } from '~/libs/components/components';
import { Outlet } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export  { App };
