import '~/assets/css/styles.scss';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './pages/app/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRoute } from './libs/enums/enums';
import { Appeals } from './pages/appeals/appeals';

const routes = createBrowserRouter([
      {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
              path: AppRoute.APPEALS,
              element: < Appeals/>
            }
        ]
      },
    ])

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <StrictMode>
          <RouterProvider router={routes}/>
    </StrictMode>
  );