 export type Props = {
    premium: boolean;
    image: string;
    price: number;
    active: boolean;
    rating: number;
    name: string;
    type: string;
    
}

type CardProps = {
  place: Props

}

function PlaceCard({place}:CardProps):JSX.Element {
    return(
    <article className="cities__card place-card">
        {
        place.premium?
        <div className="place-card__mark">
            <span>Premium</span>
        </div>
        :null
        }

        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={place.image} width="260" height="200" alt="Place image"/>
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{place.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <button className= {
                place.active? "place-card__bookmark-button place-card__bookmark-button--active button": 
                "place-card__bookmark-button button"
            } 
            type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">{place.active?"In bookmarks":"To bookmarks"}</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: place.rating}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#">{place.name}</a>
          </h2>
          <p className="place-card__type">{place.type}</p>
        </div>
    </article>
    );
}

export default PlaceCard;