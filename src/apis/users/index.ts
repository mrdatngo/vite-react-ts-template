import axios from 'axios';
import { BASE_URL, getQueryParams } from '..';
import { IAddress, ListUser } from '../../types/users';

interface IGetListUserParam {
  searchKey: string;
}

interface IGetListUserRes {
  list: ListUser;
  status: boolean;
  message?: string;
}

const fetchUsers = (params: IGetListUserParam) => {
  return axios
    .get(
      `${BASE_URL}/api/v1/users?${getQueryParams({
        name_like: params.searchKey,
      })}`
    )
    .then((res) => {
      const resData: IGetListUserRes = {
        list: res?.data,
        status: true,
      };
      return resData;
    });
};

interface ICreateUserParam {
  email: string;
  name: string;
  dateOfBirth: string;
  gender: string;
  address: IAddress;
}

interface ICreateUserRes {
  list: ListUser;
  status: boolean;
  message?: string;
}

const createAUser = (params: ICreateUserParam) => {
  return axios.post(`${BASE_URL}/api/v1/users`, params).then((res) => {
    const resData: ICreateUserRes = {
      list: res.data,
      status: true,
    };
    return resData;
  });
};

export type { IGetListUserParam, IGetListUserRes };

export { fetchUsers, createAUser };
