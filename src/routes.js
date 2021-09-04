import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import PokeList from './pages/PokeList';
import NotFound from './pages/Page404';
import Pokemon from './pages/Pokemon';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/pokemon',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <PokeList /> },
        { path: '/:id', element: <Pokemon /> }
      ]
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/houm-test', element: <Navigate to="/pokemon" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
