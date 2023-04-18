import { TeamOutlined, UserOutlined } from '@ant-design/icons';
import { MenuProps } from 'antd';
import { RouteObject } from 'react-router-dom';
import Profile from '../app-components/account-profile/AccountProfile';
import CreateUser from '../app-components/users-management/create-user/CreateUser';
import ListUser from '../app-components/users-management/list-user/ListUser';
import DefaultLayout from '../layout/DefaultLayout';
import LoginPage from '../pages/login/LoginPage';
import Page404 from '../pages/result/Page404';

interface IRoute {
  path: string;
  title: string;
  icon?: any;
  children?: IRoute[];
  component?: any;
}

const navRoutes: IRoute[] = [
  {
    path: 'user',
    title: 'Users',
    icon: <TeamOutlined />,
    children: [
      {
        path: 'users/create',
        title: 'Create User',
        component: <CreateUser />,
      },
      {
        path: 'users/list',
        title: 'List Users',
        component: <ListUser />,
      },
    ],
  },
  {
    path: 'account',
    title: 'Account',
    icon: <UserOutlined />,
    children: [
      {
        path: 'account/profile',
        title: 'Profile',
        component: <Profile />,
      },
    ],
  },
];

const getRoutes = function (rawRoutes: IRoute[]): RouteObject[] {
  const routes: RouteObject[] = [];
  for (let i = 0; i < rawRoutes.length; i++) {
    let rawRoute = rawRoutes[i];
    if (!rawRoute.children) {
      routes.push({
        path: rawRoute.path,
        element: rawRoute.component,
      });
    } else {
      routes.push(...getRoutes(rawRoute.children));
    }
  }
  return routes;
};
const navRouters = getRoutes(navRoutes);

const browserRouters: RouteObject[] = [
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: 'Page not found',
  },
  {
    path: '/',
    element: <DefaultLayout />,
    errorElement: <Page404 />,
    children: navRouters,
  },
];

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

function GetMenu(routes: IRoute[]): MenuItem[] {
  const items: MenuItem[] = [];
  routes.map((route) => {
    if (!route.children) {
      items.push(getItem(route.title, route.path, route.icon));
    } else {
      const children = GetMenu(route.children);
      items.push(getItem(route.title, route.path, route.icon, children));
    }
  });
  return items;
}

export { navRoutes, GetMenu };
export type { IRoute };
export default browserRouters;
