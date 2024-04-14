import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './libs/pages/App'

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <StrictMode>
          <App />
    </StrictMode>
  );