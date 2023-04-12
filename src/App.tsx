import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DefaultLayout from './layout/DefaultLayout';
import Login from './pages/login/LoginPage';
import Page404 from './pages/result/Page404';

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: 'Page not found',
  },
  {
    path: '/*',
    element: <DefaultLayout />,
    errorElement: <Page404 />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
