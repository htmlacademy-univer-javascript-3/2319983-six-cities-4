import { OfferProps } from '../../../types/list-offers';
import { useAppDispatch,useAppSelector } from '../../../hooks/redux';
import { fetch, fetchFavoritesAction,fetchNearbyAction,fetchReviewsAction,fetchOfferAction} from '../../../store/api-action';
import { updateSelect,redirectRoute } from '../../../store/action';
import { toast } from 'react-toastify';
import { AuthorizationStatus } from '../../../const';
import { AppRoute,APIRoute } from '../../../const';
import { api } from '../../../store';
import { useNavigate } from 'react-router-dom';


type CardProps = {
    place: OfferProps;
  };

  type ResultUseFavoriteStatus = [
    changeStatusFavoriteAction: () => void,
  ];

export const useFavoriteStatus = (offer: OfferProps | undefined): ResultUseFavoriteStatus => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();


  const authorizationStatus = useAppSelector((state) => state.authStat);

  const statusNumber = offer && offer.isFavorite ? 0 : 1;

  const nameFailedAction = statusNumber === 1 ? 'create' : 'remove';

  const buttonClickHandle = async () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return dispatch(redirectRoute(AppRoute.Login));
    }
    try {
      const { data } = await api.post<OfferProps>(`${APIRoute.Favorite}/${offer && offer.id}/${statusNumber}`, statusNumber);
      dispatch(fetch());
      dispatch(fetchFavoritesAction());
      dispatch(updateSelect(data));
    } catch {
      toast.warn(`Failed to ${nameFailedAction} a bookmark. Try again later.`);
    }
  };

  return [buttonClickHandle];
};

  type ResultUseFavoriteScreen = [
    changeStatusFavoriteAction: () => void,
  ];

export const SelectOffer = (offerId: string): ResultUseFavoriteScreen => {

  const dispatch = useAppDispatch();

  const offerCardClickHandle = async () => {
    await dispatch(fetchOfferAction(offerId.toString()));
    dispatch(fetchReviewsAction(offerId.toString()));
    dispatch(fetchNearbyAction(offerId.toString()));
  };

  return [offerCardClickHandle];
};

function FavoritePlace({place}: CardProps):JSX.Element {

  const [buttonClickHandle] = useFavoriteStatus(place);
  const [offerCardClickHandle] = SelectOffer(place.id);

  return(
    <article className="favorites__card place-card" onClick={(evt) => {
      evt.preventDefault();
      offerCardClickHandle();
    }}
    >

      {
        place.isPremium &&
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
      }

      <div className="favorites__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={place.previewImage} width="150" height="110" alt="Place image"/>
        </a>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{place.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className= {
            place.isFavorite ? 'place-card__bookmark-button place-card__bookmark-button--active button' :
              'place-card__bookmark-button button'
          }
          type="button"
          onClick={buttonClickHandle}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{place.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style= {{width: `${String(place.rating * 20)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{place.title}</a>
        </h2>
        <p className="place-card__type">{place.type}</p>
      </div>
    </article>

  );
}


export default FavoritePlace;
