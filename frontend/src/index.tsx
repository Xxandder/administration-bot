import '~/assets/css/styles.scss';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './pages/app/App'



const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <StrictMode>
          <App />
    </StrictMode>
  );