import { createAction } from '@reduxjs/toolkit';
import { AppRoute, NameCity, NameSort } from '../const';
import { OffersProps } from '../types/list-offers';
import { AuthorizationStatus } from '../const';


export const changeCity = createAction<NameCity>('setCity');

export const changeSort = createAction<NameSort>('setSort');

export const loadPlaces = createAction<OffersProps>('loadPlaces');

export const setStatus = createAction<boolean>('setStatus');

export const requireAuth = createAction<AuthorizationStatus>('requireAuth');

export const redirect = createAction<AppRoute>('redirect');


