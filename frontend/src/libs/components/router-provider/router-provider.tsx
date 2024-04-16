import {
    createBrowserRouter,
    RouterProvider as LibraryRouterProvider,
  } from 'react-router-dom';
import { AppRoute } from '~/libs/enums/enums';
import { AboutUs } from '~/pages/about-us/about-us';
import { App } from '~/pages/app/App';
import { Appeals } from '~/pages/appeals/appeals';
import { Main } from '~/pages/main/main';
import { News } from '~/pages/news/news';


  const RouterProvider: React.FC = () => {
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
  
    return <LibraryRouterProvider router={routes} />;
  };

export { RouterProvider };