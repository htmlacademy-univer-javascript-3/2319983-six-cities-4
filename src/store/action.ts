import { createAction } from '@reduxjs/toolkit';
import { AppRoute, NameCity, NameSort } from '../const';
import { AuthorizationStatus } from '../const';
import { Comments } from '../types/comment';
import { OffersProps,OfferAllInfo } from '../types/list-offers';
import { UserProps } from './api-action';


export const changeCity = createAction<NameCity>('setCity');

export const changeSort = createAction<NameSort>('setSort');

export const loadPlaces = createAction<OffersProps>('loadPlaces');

export const setStatus = createAction<boolean>('setStatus');

export const requireAuth = createAction<AuthorizationStatus>('requireAuth');

export const redirect = createAction<AppRoute>('redirect');

export const isOfferLoad = createAction<boolean>('isOfferLoading');

export const setOffer = createAction<OfferAllInfo>('setOffer');

export const isReviewsLoad = createAction<boolean>('isReviewsLoad');

export const setReviews = createAction<Comments>('setReviews');

export const isNearbyLoad = createAction<boolean>('isNearbyLoad');

export const setNearby = createAction<OffersProps>('setNearby');

export const setUserInfo = createAction<UserProps | null>('setUserInfo');


