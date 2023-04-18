import { useEffect, useState } from 'react';
import { fetchUsers } from '../../../apis/users';
import { IUserInfo } from '../../../types/users';

export default function useGetListUser(): [
  boolean,
  IUserInfo[],
  (searchKey: string) => void
] {
  const [listUser, setListUser] = useState<IUserInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getUsers = (searchKey: string) => {
    setLoading(true);
    fetchUsers({ searchKey })
      .then((data) => {
        setListUser(data.list);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUsers('');
  }, []);

  const onSearch = (searchKey: string) => {
    getUsers(searchKey);
  };

  return [loading, listUser, onSearch];
}
