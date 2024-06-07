import Header from '../../components/common/header/header';
import ListPlaces from '../../components/main/list-places/list-places';
import ListLocation from '../../components/main/list-location/list-location';
import Sorting from '../../components/main/sorting/sorting';
import Map from '../../components/main/map/map';
import { useAppSelector } from '../../hooks/redux';
import cn from 'classnames';
import { useState } from 'react';
import { OfferProps } from '../../types/list-offers';
import { useMemo } from 'react';
import { useCallback } from 'react';

function Main(): JSX.Element {
  const changeCity = useAppSelector((store) => store.places);
  const [selectOffer, setSelectOffer] = useState<OfferProps['id']>('');
  const places = useAppSelector((store) => store.selectCity);
  const placesbyCity = useMemo(() =>changeCity.filter((offer) => offer.city.name === places.toString()),[changeCity, places]);

  const handleCardMouseEnter = useCallback((id: OfferProps['id']) => setSelectOffer(id),[]);
  const handleCardMouseLeave = useCallback(() => setSelectOffer(''),[]);
  return (
    <div className="page page--gray page--main">

      <Header/>
      <main className={cn('page__main page__main--index', {'page__main--index-empty': placesbyCity.length === 0})}>
        <h1 className="visually-hidden">Cities</h1>
        <ListLocation/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesbyCity.length} places to stay in {placesbyCity[0]?.city?.name}</b>
              <Sorting/>
              <ListPlaces places = {placesbyCity} handleCardMouseLeave={handleCardMouseLeave}
                handleCardMouseEnter={handleCardMouseEnter} type="cities"
              />
            </section>
            <div className="cities__right-section">
              {Boolean(places.length) && (
                <section className="cities__map map">
                  <Map
                    places={placesbyCity}
                    selectOffer={selectOffer}
                  />
                </section>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
