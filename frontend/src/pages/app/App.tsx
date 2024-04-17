import React from 'react';

import { Header } from '~/libs/components/components';
import { Outlet } from 'react-router-dom';
import { Footer } from '~/libs/components/footer/footer';

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export  { App };
