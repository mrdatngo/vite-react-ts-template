import React, { useEffect, useState } from 'react';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from 'antd/es/layout/layout';
import { LogoutOutlined } from '@ant-design/icons';

import { accountSelector, getAccountInfoAction } from '@/_redux/features/auth';
import { navRoutes as routes, GetMenu } from '../routers/router';

import avt from '../assets/imgs/avatar.png';
import usa from '../assets/icons/usa.svg';
import { useAppDispatch } from '@/_redux/hooks';
import { ErrorBoundary } from 'react-error-boundary';

const { Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const DefaultLayout: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const { accountData: account } = accountSelector();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAccountInfoAction());
  }, []);

  const onLogout = () => {
    console.log('logout');
  };

  const breadcrumbs = location.pathname
    .split('/')
    .filter((b) => b !== '' && b !== '/');

  const headerDropdownitems: MenuProps['items'] = [
    {
      key: '0',
      label: account?.username,
    },
    {
      key: '1',
      label: (
        <Button
          style={{ float: 'right', marginBottom: '10px' }}
          type='primary'
          icon={<LogoutOutlined />}
          onClick={onLogout}
        >
          Logout
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const items = GetMenu(routes);
    console.log(items);
    setItems(items);
  }, []);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onClick: MenuProps['onClick'] = (e) => {
    navigate(e.keyPath[0]);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          LOGO
        </div>
        <Menu
          onClick={onClick}
          theme='dark'
          defaultSelectedKeys={[location.pathname]}
          mode='inline'
          items={items}
        />
      </Sider>
      <Layout className='site-layout'>
        <Content style={{ margin: '0 16px' }}>
          <Header style={{ paddingLeft: '16px', background: colorBgContainer }}>
            <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                {breadcrumbs &&
                  breadcrumbs.map((breadcrumb, index) => (
                    <Breadcrumb.Item key={index}>{breadcrumb}</Breadcrumb.Item>
                  ))}
              </Breadcrumb>
              <div style={{ display: 'flex' }}>
                <div style={{ margin: '8px' }}>
                  <img src={usa} alt='lg' style={{ width: '32px' }} />
                </div>
                <div style={{ margin: '8px' }}>
                  <Dropdown
                    menu={{ items: headerDropdownitems }}
                    placement='bottomRight'
                    arrow
                  >
                    <img src={avt} alt='avatar' style={{ width: '32px' }} />
                  </Dropdown>
                </div>
              </div>
            </Space>
          </Header>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <ErrorBoundary fallback={<div>Something went wrong</div>}>
              <Outlet />
            </ErrorBoundary>
          </div>
        </Content>
        <Footer className='text-center'>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
