import { createReducer } from '@reduxjs/toolkit';
import { NameCity } from '../const';
import { places } from '../mocks/offers';
import { OfferProps } from '../types/list-offers';
import { changeCity } from './action';


type State = {
    selectCity: NameCity;
    places: OfferProps[];
}
const installState: State = {
  selectCity: NameCity.Amsterdam,
  places,
};

export const reducer = createReducer(installState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    state.selectCity = action.payload;
  });
});
