import Header from '../../components/common/header/header';
import ListPlaces from '../../components/main/list-places/list-places';
import ListLocation from '../../components/main/list-location/list-location';
import Map from '../../components/main/map/map';
import { useAppSelector } from '../../hooks/redux';
import cn from 'classnames';

function Main(): JSX.Element {
  const changeCity = useAppSelector((store) => store.selectCity);

  const places = useAppSelector((store) => store.places);
  const placesbyCity = places.filter((place) => place.city.name === String(changeCity));
  return (
    <div className="page page--gray page--main">

      <Header isActive/>
      <main className={cn('page__main page__main--index', {'page__main--index-empty': placesbyCity.length === 0})}>
        <h1 className="visually-hidden">Cities</h1>
        <ListLocation/>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{placesbyCity.length} places to stay in {changeCity}</b>
              <form className="places__sorting" action="#" method="get">
                <span className="places__sorting-caption">Sort by</span>
                <span className="places__sorting-type" tabIndex={0}>
                  Popular
                  <svg className="places__sorting-arrow" width="7" height="4">
                    <use xlinkHref="#icon-arrow-select"></use>
                  </svg>
                </span>
                <ul className="places__options places__options--custom places__options--opened">
                  <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                  <li className="places__option" tabIndex={0}>Price: low to high</li>
                  <li className="places__option" tabIndex={0}>Price: high to low</li>
                  <li className="places__option" tabIndex={0}>Top rated first</li>
                </ul>
              </form>
              <ListPlaces places = {placesbyCity} type='near-places'/>
            </section>
            <div className="cities__right-section">
              <Map places={places}/>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
