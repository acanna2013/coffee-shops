import { useEffect, useState } from 'react';
import GoogleMap from './components/GoogleMap';
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
    <div>
      <GoogleMap userLocation={userLocation} />
    </div>
  );
}

export default App;
