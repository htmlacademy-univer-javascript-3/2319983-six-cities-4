import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, State } from './index.ts';
import { AxiosInstance } from 'axios';
import { loadPlaces, setStatus } from './action.ts';
import { OffersProps } from '../types/list-offers.ts';

enum APIRoute {
  Offers = '/offers',
}

type AsyncThunkConfig = { dispatch: Dispatch; state: State; extra: AxiosInstance };

export const fetch = createAsyncThunk<void, undefined, AsyncThunkConfig>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    dispatch(setStatus(true));
    const {data} = await api.get<OffersProps>(APIRoute.Offers);
    dispatch(loadPlaces(data));
    dispatch(setStatus(false));
  },
);
