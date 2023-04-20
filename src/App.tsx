import { Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import browserRouters from './routers/router';

const routers = createBrowserRouter(browserRouters);

export default function App() {
  return (
    <Suspense fallback={'loading...'}>
      <RouterProvider router={routers} />;
    </Suspense>
  );
}
