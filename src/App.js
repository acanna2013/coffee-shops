import { useEffect, useState } from 'react';
import GoogleMap from './components/GoogleMap';
import FilterBox from './components/FilterBox';
import HomePage from './components/HomePage';
function App() {
  const [userLocation, setUserLocation] = useState({ lat: null, lng: null });
  // Get user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);


  return (
    <div className="parent">
      {/* Homepage Section */}
      <section style={{ height: '100vh', width: '100%' }}>
        <HomePage />
      </section>

      {/* Map Section */}
      <section style={{ height: '100vh', width: '100%', display: 'flex' }}>
        <FilterBox />
        <GoogleMap userLocation={userLocation} />
      </section>
    </div>
  );
}

export default App;
