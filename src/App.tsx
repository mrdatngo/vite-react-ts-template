import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
  useParams,
} from 'react-router-dom';
import Login from './pages/login/LoginPage';

function Home() {
  return (
    <>
      <div id='sidebar'>
        <h1>React Router Contacts</h1>
        <nav>
          <ul>
            <li>
              <Link to={`contacts/1`}>Your Name</Link>
            </li>
            <li>
              <Link to={`contacts/2`}>Your Friend</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id='detail'>
        <Outlet />
      </div>
    </>
  );
}

function Contact() {
  const { contactId } = useParams();
  return <>ContactID: {contactId}</>;
}

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
    errorElement: 'Page not found',
  },
  {
    path: '/',
    element: <Home />,
    errorElement: 'Page not found',
    children: [
      {
        path: 'contacts/:contactId',
        element: <Contact />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
