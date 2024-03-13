import { LocationPlaces } from "../../../const";

function ListLocation():JSX.Element {
    return (
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">
                {
                    LocationPlaces.map((place) =>
                    <li className="locations__item">
                        <a className= {place.active? "locations__item-link tabs__item tabs__item--active":"locations__item-link tabs__item"} href="#">
                        <span>{place.name}</span>
                        </a>
                    </li>
                    )
                }
            </ul>
          </section>
        </div>
    );
}

export default ListLocation;