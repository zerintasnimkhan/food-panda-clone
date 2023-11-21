import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

function EditLocationModal({ restaurant, handleLocationChange }) {
  const mapContainer = useRef(null);
  const [currentLocation, setCurrentLocation] = useState({lng: restaurant.location.lng, lat: restaurant.location.lng})

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


    map.on('move', () => {
      const center = map.getCenter();

      const geojson = map.getSource('geojsonSource')._data;
      geojson.features[0].geometry.coordinates = [center.lng, center.lat];

      map.getSource('geojsonSource').setData(geojson);
      setCurrentLocation({lng: center.lng, lat: center.lat})
    })

    return () => map.remove();
  }, [restaurant]);


  function updateLocation () {
    handleLocationChange(currentLocation.lng, currentLocation.lat)
  }

  return (
    <div className='flex flex-col items-center'>
      <h3 className="font-bold text-lg my-5">Edit location</h3>
      <div ref={mapContainer} style={{ width: '450px', height: '300px' }} />
      <button className='btn btn-primary mt-20' onClick={updateLocation}>Update Location</button>
    </div>
  )
}

export default EditLocationModal