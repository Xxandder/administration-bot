import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './pages/app/App'

import '~/assets/css/styles.scss';

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <StrictMode>
          <App />
    </StrictMode>
  );