import { useParams,Navigate } from 'react-router-dom';
import Header from '../../components/common/header/header';
import Comment from '../../components/offer/comment/comment';
import ReviewList from '../../components/offer/review-list/review-list';
import Map from '../../components/main/map/map';
import ListPlaces from '../../components/main/list-places/list-places';
import { useAppSelector } from '../../hooks/redux';
import { AuthorizationStatus } from '../../const';
import { useEffect } from 'react';
import { fetchNearbyAction,fetchOfferAction,fetchReviewsAction } from '../../store/api-action';
import { useAppDispatch } from '../../hooks/redux';
import Spinner from '../../components/common/spinner/spinner';


function Offer(): JSX.Element {

  const places = useAppSelector((store) => store.places);
  const place = useAppSelector((state)=>state.offer);
  const comments = useAppSelector((state)=> state.comments);
  const nearby = useAppSelector((state) => state.nearby);
  const isOfferLoad = useAppSelector((state) => state.isOfferLoading);
  const isNearbyLoad = useAppSelector((state) => state.isNearbyLoad);

  const isAuth = useAppSelector((state) => state.authStat) === AuthorizationStatus.Auth;

  const ID = String(useParams<string>().id);

  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchOfferAction(ID));
    dispatch(fetchReviewsAction(ID));
    dispatch(fetchNearbyAction(ID));
  }, [dispatch, ID]);


  if (isOfferLoad || isNearbyLoad) {
    return <Spinner />;
  }

  if (!place) {
    return <Navigate to="/"/>;
  }

  const limit = nearby.slice(0, 3);

  const targetOfferPreview = places.find((offerPreview) => offerPreview.id === ID);

  const offersMap = targetOfferPreview
    ? [targetOfferPreview, ...limit]
    : limit;


  const limitImage = (
    <div className="offer__gallery">
      {place.images.slice(0, 6).map((image) => (
        <div key={image} className="offer__image-wrapper">
          <img className="offer__image" src={image} alt="Photo studio" />
        </div>
      ))}
    </div>
  );

  const goodList = (
    <ul className="offer__inside-list">
      {place.goods.map((good) => (
        <li key={good} className="offer__inside-item">
          {good}
        </li>
      ))}
    </ul>
  );


  return (
    <div className="page">
      <Header/>

      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            {limitImage}
          </div>
          <div className="offer__container container">
            <div className="offer__wrapper">
              {place.isPremium &&
                <div className="offer__mark">
                  <span>Premium</span>
                </div>}
              <div className="offer__name-wrapper">
                <h1 className="offer__name">{place.title}</h1>
                <button className={`offer__bookmark-button button ${place.isFavorite ? 'offer__bookmark-button--active' : ''}`} type="button">
                  <svg className="offer__bookmark-icon" width={31} height={33}>
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{width: `${String(place.rating * 20)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{place.rating}</span>
              </div>
              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  { place.type[0].toUpperCase() + place.type.slice(1)}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {place.bedrooms} {`Bedroom${place.bedrooms === 1 ? '' : 's'}`}
                </li>
                <li className="offer__feature offer__feature--adults">
                  {place.maxAdults} {`adult${place.maxAdults === 1 ? '' : 's'}`}
                </li>
              </ul>
              <div className="offer__price">
                <b className="offer__price-value">&euro;{place.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              <div className="offer__inside">
                <h2 className="offer__inside-title">What&apos;s inside</h2>
                {goodList}
              </div>
              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper ${place.host.isPro ? 'offer__avatar-wrapper--pro' : ''} user__avatar-wrapper`}>

                    <img className="offer__avatar user__avatar" src={place.host.avatarUrl} width={74} height={74} alt="Host avatar"/>
                  </div>
                  <span className="offer__user-name">
                    {place.host.name}
                  </span>
                  {place.host.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  <p className="offer__text">
                    {place.description}
                  </p>
                </div>
              </div>
              <ReviewList list = {comments}>
                {isAuth && <Comment offerId={ID}/>}
              </ReviewList>
            </div>
          </div>
          <section className="offer__map map">
            <Map
              places={offersMap}
              selectOffer={ID}
            />
          </section>
        </section>
        <div className="container">
          {limit.length !== 0 &&
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <ListPlaces places={limit} type='near-places'/>
          </section>}
        </div>
      </main>
    </div>
  );
}

export default Offer;
