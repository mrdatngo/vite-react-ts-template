import { UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Space, Tabs, TabsProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getAccountInfo } from '../../apis/auth';
import { IAccountInfo } from '../../types/account';
import ProfileDetail from './profile-detail/ProfileDetail';

const { Text } = Typography;

const AccountProfile: React.FC = () => {
  const [account, setAccount] = useState<IAccountInfo>();
  const [tabItems, setTabItems] = useState<TabsProps['items']>();

  useEffect(() => {
    getAccountInfo().then((acc) => {
      setAccount(acc);
    });
  }, []);

  useEffect(() => {
    const items: TabsProps['items'] = [
      {
        key: '1',
        label: `Detail`,
        children: <ProfileDetail account={account} />,
      },
      {
        key: '2',
        label: `Login Logs`,
        children: `Login logs`,
      },
    ];
    setTabItems(items);
  }, [account]);

  const onChange = (key: string) => {
    console.log(key);
  };

  return (
    <>
      <Space size={24}>
        <Badge dot>
          <Avatar shape='square' icon={<UserOutlined />} />
        </Badge>
        <Space direction='vertical'>
          <Text strong>{account?.email}</Text>
          <Text>{account?.role}</Text>
        </Space>
      </Space>
      <Tabs defaultActiveKey='1' items={tabItems} onChange={onChange} />
    </>
  );
};

export default AccountProfile;
