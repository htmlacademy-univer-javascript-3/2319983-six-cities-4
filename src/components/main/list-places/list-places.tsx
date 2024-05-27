import PlaceCard from '../place-card/place-card';
import { OffersProps } from '../../../types/list-offers';
import { NameSort } from '../../../const';
import { OfferProps } from '../../../types/list-offers';
import { useAppSelector } from '../../../hooks/redux';


export type ListProps = {
    places: OffersProps;
    type: 'cities' | 'near-places';
    handleCardMouseEnter?: (id: OfferProps['id']) => void;
    handleCardMouseLeave?: () => void;

}

const SortType: Record<NameSort, (firstOffer: OfferProps, secondOffer: OfferProps) => number> = {
  [NameSort.Popular]: () => 0,
  [NameSort.LowToHigh]: (first, second) => first.price - second.price,
  [NameSort.HighToLow]: (first, second) => second.price - first.price,
  [NameSort.TopRated]: (first, second) => second.rating - first.rating
};

function ListPlaces({places,handleCardMouseEnter,
  handleCardMouseLeave,type}: ListProps):JSX.Element {


  const selectedSoftType = useAppSelector((state) => state.selectSort);
  const sortPlaces = [...places].sort(SortType[selectedSoftType]);

  return(
    <div className="cities__places-list places__list tabs__content">
      {
        sortPlaces.map((place) =>(
          <PlaceCard key = {place.id} place = {place} type={type} handleCardMouseEnter={handleCardMouseEnter}
            handleCardMouseLeave={handleCardMouseLeave}
          />
        ))
      }
    </div>
  );
}

export default ListPlaces;
