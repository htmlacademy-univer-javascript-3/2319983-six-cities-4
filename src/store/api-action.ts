import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, State } from './index.ts';
import { AxiosInstance } from 'axios';
import { loadPlaces, setStatus,requireAuth,redirect } from './action.ts';
import { OffersProps } from '../types/list-offers.ts';
import { AuthorizationStatus } from '../const.ts';
import { dropToken } from '../server/token.ts';
import { saveToken } from '../server/token.ts';
import { AppRoute } from '../const.ts';


export type UserProps = {
  id: number;
  email: string;
  token: string;
};


export type AuthProps = {
  login: string;
  password: string;
};

enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
}

type AsyncThunkConfig = { dispatch: Dispatch; state: State; extra: AxiosInstance };

export const fetch = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'fetch',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setStatus(true));
    const {data} = await api.get<OffersProps>(APIRoute.Offers);
    dispatch(loadPlaces(data));
    dispatch(setStatus(false));
  },
);


export const checkAuth = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    try {
      await api.get(APIRoute.Login);
      dispatch(requireAuth(AuthorizationStatus.Auth));
    } catch {
      dispatch(requireAuth(AuthorizationStatus.NoAuth));
    }
  },
);

export const logout = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
    dispatch(requireAuth(AuthorizationStatus.NoAuth));
  },
);

export const loginAction = createAsyncThunk<void, AuthProps, AsyncThunkConfig>(
  'login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data: {token}} = await api.post<UserProps>(APIRoute.Login, {email, password});
    saveToken(token);
    dispatch(requireAuth(AuthorizationStatus.Auth));
    dispatch(redirect(AppRoute.Main));
  },
);
