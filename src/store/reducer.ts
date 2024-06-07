import { createReducer, } from '@reduxjs/toolkit';
import { NameCity,NameSort,AuthorizationStatus, } from '../const';
// import { places } from '../mocks/offers';
import { OfferProps } from '../types/list-offers';
import { changeCity, changeSort, requireAuth,isOfferLoad,setOffer,isReviewsLoad,setReviews,setNearby,isNearbyLoad,setUserInfo,getFavorites, getIsFavoritesLoading} from './action';
import { loadPlaces } from './action';
import { setStatus } from './action';
import { OfferAllInfo } from '../types/list-offers';
import { Comments } from '../types/comment';
import { UserProps, } from './api-action';
import { fetchFavorites, toggleFavorite } from './api-action';
import { PayloadAction } from '@reduxjs/toolkit';


type State = {
    selectCity: NameCity;
    places: OfferProps[];
    selectSort: NameSort;
    isLoad: boolean;
    authStat: AuthorizationStatus;
    isOfferLoading: boolean;
    offer: OfferAllInfo | null;
    offers: OfferProps[];
    isReviewsLoad: boolean;
    comments: Comments;
    isNearbyLoad: boolean;
    nearby: OfferProps[];
    userInfo: UserProps | null;
    favorite: OfferProps[];
    favorites: OfferProps[];
    isFavoriteLoad: boolean;

}
const State: State = {
  selectCity: NameCity.Paris,
  places: [],
  selectSort: NameSort.Popular,
  isLoad: false,
  authStat: AuthorizationStatus.Unknown,
  isOfferLoading: false,
  offer: null,
  offers: [],

  isReviewsLoad: false,
  comments: [],
  isNearbyLoad: false,
  nearby: [],
  userInfo: {
    avatarUrl: 'https://14.design.htmlacademy.pro/static/avatar/1.jpg',
    email: 'oliver.conner@gmail.com',
    isPro: false,
    name: 'Oliver.conner',
    token: 'b2xpdmVyLmNvbm5lckBnbWFpbC5jb20='
  },
  favorite: [],
  favorites: [],

  isFavoriteLoad: false,

};

export const reducer = createReducer(State, (builder) => {
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
    })
    .addCase(getFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(getIsFavoritesLoading, (state, action) => {
      state.isFavoriteLoad = action.payload;
    })
    .addCase(fetchFavorites.fulfilled, (state, action: PayloadAction<OfferProps[]>) => {
      state.favorites = action.payload;
      state.offers = state.offers.map((offer) => ({
        ...offer,
        isFavorite: action.payload.some((fav) => fav.id === offer.id),
      }));
    })
    .addCase(toggleFavorite.fulfilled, (state, action: PayloadAction<OfferAllInfo>) => {
      const updatedOffer = action.payload;
      state.offers = state.offers.map((offer) => offer.id === updatedOffer.id ? updatedOffer : offer
      );
      if (state.offer && state.offer.id === updatedOffer.id) {
        state.offer = updatedOffer;
      }
      if (updatedOffer.isFavorite) {
        state.favorites.push(updatedOffer);
      } else {
        state.favorites = state.favorites.filter((offer) => offer.id !== updatedOffer.id);
      }
    });
});
