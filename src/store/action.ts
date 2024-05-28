import { createAction } from '@reduxjs/toolkit';
import { NameCity, NameSort } from '../const';
import { OffersProps } from '../types/list-offers';

export const changeCity = createAction<NameCity>('setCity');

export const changeSort = createAction<NameSort>('setSort');

export const loadPlaces = createAction<OffersProps>('loadPlaces');

export const setStatus = createAction<boolean>('setStatus');
