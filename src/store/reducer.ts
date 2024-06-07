import { createReducer } from '@reduxjs/toolkit';
import { NameCity,NameSort,AuthorizationStatus, } from '../const';
import { places } from '../mocks/offers';
import { OfferProps } from '../types/list-offers';
import { changeCity, changeSort, requireAuth,isOfferLoad,setOffer,isReviewsLoad,setReviews,setNearby,isNearbyLoad,setUserInfo} from './action';
import { loadPlaces } from './action';
import { setStatus } from './action';
import { OfferAllInfo } from '../types/list-offers';
import { Comments } from '../types/comment';
import { UserProps } from './api-action';


type State = {
    selectCity: NameCity;
    places: OfferProps[];
    selectSort: NameSort;
    isLoad: boolean;
    authStat: AuthorizationStatus;
    isOfferLoading: boolean;
    offer: OfferAllInfo | null;
    isReviewsLoad: boolean;
    comments: Comments;
    isNearbyLoad: boolean;
    nearby: OfferProps[];
    userInfo: UserProps | null;
}
const installState: State = {
  selectCity: NameCity.Amsterdam,
  places,
  selectSort: NameSort.Popular,
  isLoad: false,
  authStat: AuthorizationStatus.Unknown,
  isOfferLoading: false,
  offer: null,
  isReviewsLoad: false,
  comments: [],
  isNearbyLoad: false,
  nearby: [],
  userInfo: null,

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
    .addCase(setStatus, (state, action) => {
      state.isLoad = action.payload;
    })
    .addCase(requireAuth, (state,action) => {
      state.authStat = action.payload;
    })
    .addCase(isOfferLoad, (state, action) => {
      state.isOfferLoading = action.payload;
    })
    .addCase(setOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(isReviewsLoad, (state, action) => {
      state.isReviewsLoad = action.payload;
    })
    .addCase(setReviews, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(isNearbyLoad, (state, action) => {
      state.isNearbyLoad = action.payload;
    })
    .addCase(setNearby, (state, action) => {
      state.nearby = action.payload;
    })
    .addCase(setUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });

});
