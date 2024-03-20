import PlaceCard from '../place-card/place-card';
import { OffersProps } from '../../../types/list-offers';


export type ListProps = {
    places: OffersProps[];

}

function ListPlaces({places}: ListProps):JSX.Element {
  return(
    <div className="cities__places-list places__list tabs__content">
      {
        places.map((place) =>(
          <PlaceCard key = {place.id} place = {place}/>
        ))
      }
    </div>
  );
}

export default ListPlaces;
