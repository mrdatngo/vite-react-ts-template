import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ListUser } from '@/types/users';
import { fetchUsers, IGetListUserParam, IGetListUserRes } from '@/apis/users';
import { useAppSelector } from '../hooks';
import { RootState } from '../store';

export interface UsersState {
  users: {
    loading: boolean;
    list: ListUser | undefined;
  };
}

const initialState: UsersState = {
  users: {
    loading: false,
    list: undefined,
  },
};
// continue here tomorrow
export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsersAction.pending, (state) => {
        state.users.loading = true;
      })
      .addCase(getUsersAction.fulfilled, (state, action) => {
        state.users.loading = false;
        state.users.list = action.payload.list;
      })
      .addCase(getUsersAction.rejected, (state) => {
        state.users.loading = false;
        state.users.list = undefined;
      });
  },
});

export const getUsersAction = createAsyncThunk(
  'auth/fetchUsers',
  async (params: IGetListUserParam) => {
    const res: IGetListUserRes = await fetchUsers(params);
    return res;
  }
);

export default userSlice.reducer;

export const usersListSelector = () =>
  useAppSelector((state: RootState) => state.user.users);
