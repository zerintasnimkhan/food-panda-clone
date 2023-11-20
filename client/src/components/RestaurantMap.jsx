import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

function RestaurantMap({ restaurant }) {
  const mapContainer = useRef(null);

  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [restaurant.location.lng, restaurant.location.lat],
      zoom: 18
    });

    const geojsonData = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [restaurant.location.lng, restaurant.location.lat]
          },
          properties: {
            title: restaurant.name,
          }
        }
      ]
    };

    map.on('load', () => {
      map.addSource('geojsonSource', {
        type: 'geojson',
        data: geojsonData,
      });

      map.addLayer({
        id: 'geojsonLayer',
        type: 'circle',
        source: 'geojsonSource',
        paint: {
          'circle-radius': 8,
          'circle-color': '#e00965',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });
    });

    return () => map.remove();
  });


  return (
    <div>
      <div ref={mapContainer} style={{ width: '450px', height: '300px' }} />
    </div>
  )
}

export default RestaurantMap