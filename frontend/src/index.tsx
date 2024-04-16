import '~/assets/css/styles.scss';

import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { App } from './pages/app/App';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppRoute } from './libs/enums/enums';
import { Appeals } from './pages/appeals/appeals';
import { AboutUs } from './pages/about-us/about-us';
import { News } from './pages/news/news';
import { Main } from './pages/main/main';

const routes = createBrowserRouter([
      {
        path: AppRoute.ROOT,
        element: <App />,
        children: [
            {
              path: AppRoute.ROOT,
              element: < Main/>
            },
            {
              path: AppRoute.APPEALS,
              element: < Appeals/>
            },
            {
              path: AppRoute.ABOUT_US,
              element: < AboutUs/>
            },
            {
              path: AppRoute.NEWS,
              element: < News/>
            },
        ]
      },
    ])

const root = createRoot(document.querySelector('#root') as HTMLElement);

root.render(
    <StrictMode>
          <RouterProvider router={routes}/>
    </StrictMode>
  );