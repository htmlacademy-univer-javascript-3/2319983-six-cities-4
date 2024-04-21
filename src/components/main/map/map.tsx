import {useRef, useEffect} from 'react';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import { OffersProps } from '../../../types/list-offers';


type MapProps = {
    places: OffersProps;

  }
function Map({places}: MapProps) {
  const mapRef = useRef(null);
  const city = places[0].city.location;
  const map = useMap({mapRef, city});

  useEffect(() => {
    if (map) {
      places.forEach((place) => {
        leaflet
          .marker({
            lat: place.location.latitude,
            lng: place.location.longitude,
          },
          )
          .addTo(map);
      });
    }
  }, [map, places]);


  return <section className="cities__map map" ref={mapRef}/>;
}

export default Map;
