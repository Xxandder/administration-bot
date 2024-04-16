import '~/assets/css/styles.scss';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { RouterProvider } from './libs/components/components';



const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <StrictMode>
      <RouterProvider />
    </StrictMode>
  );