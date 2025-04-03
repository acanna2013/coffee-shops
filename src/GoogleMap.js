
// app.js: where the logic of the app is written
// 

import {useEffect, useRef, useState} from 'react';
import {Loader} from '@googlemaps/js-api-loader';
import './GoogleMap.css';
import './components/designtokens'
let map;
function GoogleMap() {
  const googlemap = useRef(null);
  // const [state, setState] = useState(initialState)
  // call useState to declare a state variable
  // userLocation is a state variable
  // setUserLocation is a setter function
  // array returned by useState always has 2 items
  // [ and ] syntax is called array destructuring --> read values from an array
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  var styles = [
    {
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#c9b194"
        },
        {
          "saturation": -10
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#493628"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6c4e31"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#6c4e31"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#d5c7a3"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8ba888"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#a67b5b"
        },
        {
          "saturation": -30
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#7b6351"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#cfb7a5"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#63442c"
        },
        {
          "saturation": -15
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#a86361"
        }
      ]
    },
    {
      "featureType": "transit.station",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#803d3b"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#8495ae"
        },
        {
          "saturation": -15
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#102c57"
        }
      ]
    }
  ]

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
    if (userLocation.lat && userLocation.lng) {
    const loader = new Loader({
      apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
      version: 'weekly',
    });
    
    loader.load().then(() => {
      console.log("Google Maps API loaded successfully");
      const google = window.google;
      map = new google.maps.Map(googlemap.current, {
        center: userLocation,
        zoom: 12,
        styles: styles
      });
      new google.maps.Marker({
        position: userLocation,
        map: map,
        title: "You are here",
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "#50b8e7",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#FFFFFF"
        }
      });
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
      onLoad={() => console.log("Map container loaded")}
    />
  );
}

export default GoogleMap;