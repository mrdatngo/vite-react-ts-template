import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import browserRouters from './routers/router';

const routers = createBrowserRouter(browserRouters, { basename: '/bo' });

export default function App() {
  return (
    <Suspense fallback={'loading...'}>
      <RouterProvider router={routers} />;
    </Suspense>
  );
}
