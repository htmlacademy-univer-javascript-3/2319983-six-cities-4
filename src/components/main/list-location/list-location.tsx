import { Link } from 'react-router-dom';
import { AppRoute, NameCity } from '../../../const';
import { useAppSelector } from '../../../hooks/redux';
import cn from 'classnames';
import { useDispatch } from 'react-redux';
import { changeCity } from '../../../store/action';
function ListLocation():JSX.Element {
  const activeCity = useAppSelector((store) =>store.selectCity);
  const dispatch = useDispatch();

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {
            Object.values(NameCity).map((city) => {
              const handleTabClick = () => dispatch(changeCity(city));
              return (
                (
                  <li key = {city} className="locations__item">

                    <Link className= {cn('locations__item-link tabs__item',{['tabs__item--active'] : city === activeCity})} to ={AppRoute.Main} onClick={handleTabClick}>
                      <span>{city}</span>
                    </Link>
                  </li>

                )

              );

            }

            )
          }
        </ul>
      </section>
    </div>
  );
}

export default ListLocation;
