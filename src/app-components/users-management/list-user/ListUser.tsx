import React from 'react';
import { Input, Space, Table, Tag } from 'antd';
import { IUserInfo } from '../../../types/users';
import useGetListUser from './useGetListUser';

const { Search } = Input;
const { Column } = Table;

const ListUser: React.FC = () => {
  const [loading, listUser, onSearch] = useGetListUser();

  const onChange = (event: React.ChangeEvent<HTMLInputElement> | undefined) => {
    if (event) {
      onSearch(event.target.value);
    }
  };

  return (
    <Space direction='vertical' style={{ width: '100%' }}>
      <Search
        placeholder='Search by first name'
        onSearch={onSearch}
        onChange={onChange}
        style={{ width: 200 }}
      />
      <Table loading={loading} rowKey='id' dataSource={listUser}>
        <Column title='Email' dataIndex='email' key='email' />
        <Column title='Name' dataIndex='name' key='name' />
        <Column
          title='Date of birth'
          dataIndex='dateOfBirth'
          key='dateOfBirth'
        />
        <Column
          title='Address'
          key='address'
          render={(_: any, record: IUserInfo) => (
            <>{record.address?.street + ' ' + record.address?.province}</>
          )}
        />
        <Column
          title='Action'
          key='action'
          render={(_: any, record: IUserInfo) => (
            <Space size='middle'>
              <a>Edit {record.name}</a>
              <a>Delete</a>
            </Space>
          )}
        />
      </Table>
    </Space>
  );
};

export default ListUser;
