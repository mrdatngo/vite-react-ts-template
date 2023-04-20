import { getUsersAction, usersListSelector } from '@/_redux/features/user';
import { useAppDispatch } from '@/_redux/hooks';
import { useEffect } from 'react';
import { IUserInfo } from '../../../types/users';

export default function useGetListUser(): [
  boolean,
  IUserInfo[] | undefined,
  (searchKey: string) => void
] {
  const { loading, list: listUser } = usersListSelector();
  const dispatch = useAppDispatch();

  const getUsers = (searchKey: string) => {
    dispatch(getUsersAction({ searchKey }));
  };

  useEffect(() => {
    getUsers('');
  }, []);

  const onSearch = (searchKey: string) => {
    getUsers(searchKey);
  };

  return [loading, listUser, onSearch];
}
