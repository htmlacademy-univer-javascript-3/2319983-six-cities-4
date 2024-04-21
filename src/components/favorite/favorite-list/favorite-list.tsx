import { OffersProps } from '../../../types/list-offers';
import FavoritePlaceCard from '../favorite-place-card/favorite-place-card';

type FavoriteListProps = {
    places: OffersProps;
}

function FavoriteList({places}: FavoriteListProps):JSX.Element {
  const cities = [...new Set(places.map((offer) => offer.city.name))];
  return (
    <ul className="favorites__list">
      {
        cities.map((city) => {
          const placesInCity = places.filter((plase) => plase.city.name === city);
          return (
            <li className="favorites__locations-items" key={city}>
              <div className="favorites__locations locations locations--current">
                <div className="locations__item">
                  <a className="locations__item-link" href="#">
                    <span>{city}</span>
                  </a>
                </div>
              </div>

              <div className="favorites__places">
                {placesInCity.map((place) => (
                  <FavoritePlaceCard place={place} key={place.id}/>
                ))}
              </div>
            </li>
          );

        })

      }
    </ul>
  );
}


export default FavoriteList;
