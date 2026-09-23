import { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import useSound from 'use-sound';
import { Pause, Play } from 'lucide-react';

import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

const INITIAL_CENTER = [
  -74.0242,
  40.6941
]
const INITIAL_ZOOM = 10.12

function App() {
  const mapRef = useRef()
  const mapContainerRef = useRef()
  const [playLofiSong, { pause: pauseLofiSong }] = useSound('/lofi_song.mp3', {
    onend: () => setIsMusicPlaying(false)
  })

  const [center, setCenter] = useState(INITIAL_CENTER)
  const [zoom, setZoom] = useState(INITIAL_ZOOM)
  const [searchQuery, setSearchQuery] = useState('')
  const [hasStartedMusic, setHasStartedMusic] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: mapContainerRef.current,
      style: 'mapbox://styles/banaenaed/cmu30lchk002m01qm36qb21g3',
      center: [-24, 42],
      zoom: 1
    });

     // Add geolocate control to the map.
    mapRef.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true,
      })
    );

    return () => {
      mapRef.current.remove();
    };
  }, []);

const handleSearchSubmit = (e) => {
  e.preventDefault()
}

const handleMusicIconClick = () => {
  playLofiSong()
  setHasStartedMusic(true)
  setIsMusicPlaying(true)
}

const handlePauseResumeClick = () => {
  if (isMusicPlaying) {
    pauseLofiSong()
    setIsMusicPlaying(false)
  } else {
    playLofiSong()
    setIsMusicPlaying(true)
  }
}

return (
  <>
    <div className="sidebar">
    </div>
      <div className="fun-coffee-icon-wrapper">
        <img
          src='/coffee_cat_icon.png'
          className="fun-coffee-icon-button"
          onClick={handleMusicIconClick}
          alt="Play lofi music"
        />
        {isMusicPlaying && (
          <>
            <span className="music-note">♪</span>
            <span className="music-note">♫</span>
            <span className="music-note">♪</span>
          </>
        )}
        {hasStartedMusic && (
          <button className="music-pause-resume-button" onClick={handlePauseResumeClick}>
            {isMusicPlaying ? <Pause /> : <Play />}
          </button>
        )}
      </div>
    <div id='map-container' ref={mapContainerRef}>
    <form className='search-coffee' onSubmit={handleSearchSubmit}>
      <input 
      type='text'
      className='search-input'
      placeholder='what kind of coffee shop are you looking for?'
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>

    </div>
  </>

  )
}

export default App