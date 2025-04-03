
// app.js: where the logic of the app is written
// 

import {useEffect, useRef, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import './GoogleMap.css';
import './components/designtokens'

function GoogleMap() {
  const googlemap = useRef(null);
  // const [state, setState] = useState(initialState)
  // call useState to declare a state variable
  // userLocation is a state variable
  // setUserLocation is a setter function
  // array returned by useState always has 2 items
  // [ and ] syntax is called array destructuring --> read values from an array
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

  useEffect(() => { // useEffect: allows side effects in component; runs on every render
    // HTML5 geolocation
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error("Error getting location:", error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    console.log("API Key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

    if (userLocation.lat && userLocation.lng) {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });
    let map;
    loader.load().then(() => {
      console.log("Google Maps API loaded successfully");
      console.log("Window object:", window);
      console.log("Google object:", window.google);
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: userLocation,
        zoom: 8,
      });

      new google.maps.Marker({
        position: userLocation,
        map,
        title: "You are here."
      })
    });
  }
  }, [userLocation]); 
  // useEffect(<setup>, <dependency>): second arg is optional
  // userLocation is a dependency (list of reactive values referenced inside of the setup [first param] code)
  // if you use functions/var declared outside of the useEffect(), add it as dependency in case it might change

  return (
    <div
      id="map"
      ref={googlemap}
      className="map-container"
      onLoad={() => console.log("Map container loaded")}
    />
  );
}

export default GoogleMap;