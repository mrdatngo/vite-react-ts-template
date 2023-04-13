import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import browserRouters from './routers/router';

const routers = createBrowserRouter(browserRouters);

export default function App() {
  return <RouterProvider router={routers} />;
}
