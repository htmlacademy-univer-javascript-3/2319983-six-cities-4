import {useRef, useEffect} from 'react';
import { Marker, layerGroup } from 'leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import useMap from './use-map';
import { OffersProps,OfferProps } from '../../../types/list-offers';


const pin = new Icon({
  iconUrl: 'img/pin.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 39]
});

const activePin = new Icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [27, 39],
  iconAnchor: [20, 39]
});

type MapProps = {
    selectOffer?: OfferProps['id'];
    places: OffersProps;

  }
function Map({places, selectOffer: selectedOfferId}: MapProps) {
  const mapRef = useRef(null);
  const city = places[0].city.location;
  const map = useMap({mapRef, city});

  useEffect(() => {
    if (map) {
      const layer = layerGroup().addTo(map);
      places.forEach((place) => {
        const marker = new Marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        });
        marker.setIcon(
          selectedOfferId !== undefined && place.id === selectedOfferId
            ? activePin
            : pin

        )
          .addTo(layer);
      });
    }
  }, [map, places,selectedOfferId]);

  useEffect(() => {
    if (map) {
      map.flyTo([city.latitude, city.longitude]);
    }
  }, [city, map]);


  return (
    <div ref={mapRef} style={{height: '100%'}}></div>
  );
}

export default Map;
