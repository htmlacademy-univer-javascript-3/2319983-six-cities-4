import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch, State } from './index.ts';
import { AxiosInstance } from 'axios';
import { loadPlaces, setStatus,requireAuth,redirect, isOfferLoad, setOffer,isReviewsLoad,isNearbyLoad, setReviews, setNearby} from './action.ts';
import { OffersProps } from '../types/list-offers.ts';
import { AuthorizationStatus } from '../const.ts';
import { dropToken } from '../server/token.ts';
import { saveToken } from '../server/token.ts';
import { AppRoute } from '../const.ts';
import { Comments } from '../types/comment.ts';
import { APIRoute } from '../const.ts';
import { OfferAllInfo } from '../types/list-offers.ts';

export type UserProps = {
  id: number;
  email: string;
  token: string;
};

export type AuthProps = {
  login: string;
  password: string;
};


export type ReviewData = {
  comment: string;
  rating: number;
  offerId: string;
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

export const fetchOfferAction = createAsyncThunk<void, string, AsyncThunkConfig>(
  'fetchOffer',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(isOfferLoad(true));
      const {data} = await api.get<OfferAllInfo>(`${APIRoute.Offers}/${id}`);
      dispatch(setOffer(data));
    } catch {
      dispatch(redirect(AppRoute.PageNotFound));
    } finally {
      dispatch(isOfferLoad(false));
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, AsyncThunkConfig>(
  'fetchReviews',
  async (id, { dispatch, extra: api }) => {
    try {
      dispatch(isReviewsLoad(true));
      const { data } = await api.get<Comments>(`${APIRoute.Review}/${id}`);
      dispatch(setReviews(data));
    } catch {
      dispatch(redirect(AppRoute.PageNotFound));
    } finally {
      dispatch(isReviewsLoad(false));
    }
  }
);

export const fetchNearbyAction = createAsyncThunk<void, string, AsyncThunkConfig>(
  'fetchNearby',
  async (id, {dispatch, extra: api}) => {
    try {
      dispatch(isNearbyLoad(true));
      const {data} = await api.get<OffersProps>(`${APIRoute.Offers}/${id}${APIRoute.Nearby}`);
      dispatch(setNearby(data));
    } catch {
      dispatch(redirect(AppRoute.PageNotFound));
    } finally {
      dispatch(isNearbyLoad(false));
    }
  },
);

export const postReviewAction = createAsyncThunk<void, ReviewData, AsyncThunkConfig>(
  'postReview',
  async ({comment, rating, offerId}, {dispatch, extra: api}) => {
    await api.post<ReviewData>(`${APIRoute.Review}/${offerId}`, {comment, rating});
    dispatch(fetchReviewsAction(offerId));
  },
);
