import React from 'react';

import styles from './styles.module.scss';

const App: React.FC = () => {
  return (
    <div>
      <h1 className={styles['text-font']}>Hello, Vite React App!</h1>
      <p>Welcome to your new React app powered by Vite.</p>
    </div>
  );
};

export  { App };
