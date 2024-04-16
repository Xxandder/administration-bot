import React from 'react';

import styles from './styles.module.scss';

import { Header } from '~/libs/components/header/header';
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
