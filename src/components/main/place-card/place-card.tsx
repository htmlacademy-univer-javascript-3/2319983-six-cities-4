import { Link } from 'react-router-dom';
import { OfferProps } from '../../../types/list-offers';


type CardProps = {
  place: OfferProps;
  type: string;
  handleCardMouseEnter?: (id: OfferProps['id']) => void;
  handleCardMouseLeave?: () => void;
};

function PlaceCard({place,handleCardMouseLeave: handleMouseLeave, handleCardMouseEnter: handleMouseEnter, type}:CardProps):JSX.Element {


  return(
    <article


      onMouseEnter={() => handleMouseEnter?.(place.id)}
      onMouseLeave={() => handleMouseLeave?.()}

      className={`${type}__card place-card`}
    >
      {
        place.isPremium &&
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      }

      <div className={`${type}__image-wrapper place-card__image-wrapper`}>
        <Link to={`/offer/${place.id}`}>
          <img className="place-card__image" src={place.previewImage} width="260" height="200" alt="Place image"/>
        </Link>
      </div>
      <div className="place-card__info">
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
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{place.isFavorite ? 'In bookmarks' : 'To bookmarks'}</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${String(place.rating * 20)}%`}}></span>
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

export default PlaceCard;
