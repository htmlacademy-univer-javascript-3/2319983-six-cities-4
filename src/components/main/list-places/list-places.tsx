import PlaceCard from '../place-card/place-card';
import { OffersProps } from '../../../types/list-offers';
import { useState } from 'react';


export type ListProps = {
    places: OffersProps;

}

function ListPlaces({places}: ListProps):JSX.Element {

  const [, setCardHover] = useState<string|null> (null);
  const handCardHover = (id: string | null) => setCardHover(id);

  return(
    <div className="cities__places-list places__list tabs__content">
      {
        places.map((place) =>(
          <PlaceCard key = {place.id} place = {place} onCardHover = {handCardHover}/>
        ))
      }
    </div>
  );
}

export default ListPlaces;
