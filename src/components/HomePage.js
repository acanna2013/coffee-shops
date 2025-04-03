// pages/index.js
import LocatorButton from '../components/LocatorButton';
import Map from '../components/Map';
import React, { useState } from 'react';
function HomePage() {
  const [mapObject, setMapObject] = useState(null);
  return (
    <>
      <LocatorButton mapObject={mapObject} /> 
      <Map setMapObject={setMapObject} />
    </>
  );
}

// mapObject state variable stores an instance of the embedded Google Maps
// <Map> component embeds Google Maps, passes to index.js by executing the setMapObject() method
// then index.js will hand it over to the <LocatorButton> which marks user's curr loc on embedded Google Maps
export default HomePage;