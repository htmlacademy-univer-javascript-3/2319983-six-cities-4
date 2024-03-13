import PlaceCard from "../place-card/place-card";
import { Props } from "../place-card/place-card";


export type ListProps = {
    places: Props[]

}

function ListPlaces({places}: ListProps):JSX.Element {
    return(
    <div className="cities__places-list places__list tabs__content">
    {
        places.map((place) =>(
            <PlaceCard place = {place}/>
        ))
    }
    </div>
    );
}

export default ListPlaces;