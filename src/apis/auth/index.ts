import axios from 'axios';
import { BASE_URL } from '..';
import { IAccountInfo } from '../../types/account';

interface ILoginParam {
  username: string;
  password: string;
}

interface ILoginResponse {
  username: string;
  token: string;
}

const login = (param: ILoginParam) => {
  const loginParam = {
    username: param.username,
    password: param.password,
  };
  return axios.post(`${BASE_URL}/api/v1/login`, loginParam).then((res) => {
    const loginRes: ILoginResponse = {
      username: res.data.username,
      token: res.data.token,
    };
    return loginRes;
  });
};

const getAccountInfo = () => {
  return axios.get(`${BASE_URL}/api/v1/account/detail`).then((res) => {
    const resData: IAccountInfo = res.data as IAccountInfo;
    return resData;
  });
};

export type { ILoginParam, ILoginResponse };

export { login, getAccountInfo };
