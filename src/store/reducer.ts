import { createReducer } from '@reduxjs/toolkit';
import { NameCity,NameSort,AuthorizationStatus } from '../const';
import { places } from '../mocks/offers';
import { OfferProps } from '../types/list-offers';
import { changeCity, changeSort, requireAuth } from './action';
import { loadPlaces as loadPlaces } from './action';
import { setStatus as setPlacesStatus } from './action';


type State = {
    selectCity: NameCity;
    places: OfferProps[];
    selectSort: NameSort;
    isLoad: boolean;
    authStat: AuthorizationStatus;
}
const installState: State = {
  selectCity: NameCity.Amsterdam,
  places,
  selectSort: NameSort.Popular,
  isLoad: false,
  authStat: AuthorizationStatus.Unknown,


};


export const reducer = createReducer(installState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.selectCity = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.selectSort = action.payload;
    })
    .addCase(loadPlaces, (state, action) => {
      state.places = action.payload;
    })
    .addCase(setPlacesStatus, (state, action) => {
      state.isLoad = action.payload;
    })
    .addCase(requireAuth, (state,action) => {
      state.authStat = action.payload;
    });
});
