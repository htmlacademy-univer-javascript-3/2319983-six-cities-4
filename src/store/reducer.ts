import { createReducer } from '@reduxjs/toolkit';
import { NameCity,NameSort as NameSort } from '../const';
import { places } from '../mocks/offers';
import { OfferProps } from '../types/list-offers';
import { changeCity, changeSort } from './action';


type State = {
    selectCity: NameCity;
    places: OfferProps[];
    selectSort: NameSort;
}
const installState: State = {
  selectCity: NameCity.Amsterdam,
  places,
  selectSort: NameSort.Popular

};

export const reducer = createReducer(installState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.selectCity = action.payload;
    })
    .addCase(changeSort, (state, action) => {
      state.selectSort = action.payload;
    });
});
