import { createAction } from '@reduxjs/toolkit';
import { NameCity, NameSort } from '../const';

export const changeCity = createAction<NameCity>('setCity');

export const changeSort = createAction<NameSort>('setSort');
