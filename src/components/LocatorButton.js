// components/LocatorButton.js
import PropTypes from 'prop-types';
const LocatorButton = ({mapObject}) => { // mapObject: embedded Google Maps
    const getUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = {
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                };
                mapObject.setCenter(userLocation); // snaps map to user's curr location
            }); // getCurrPos(): when it runs, retrieves user loc data from device, done async
            // once loc obtained, passed to a function as the arg for getCurrPos(), called position 
            // user loc data takes form of a JS object (GeoLocationPosition interface), has property called coords
            // coords: stores latitude and longitude
        } else {

        }
    };
  return (
    <button
        onClick={getUserLocation}
        type="button"
    >
        BUTTON!
    </button>
  );
};
LocatorButton.propTypes = {
  mapObject: PropTypes.object,
}; // used PropTypes to define type of the MapObject prop
export default LocatorButton;