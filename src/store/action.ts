import { createAction } from '@reduxjs/toolkit';
import { NameCity } from '../const';

export const changeCity = createAction<NameCity>('setCity');
