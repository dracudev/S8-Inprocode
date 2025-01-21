import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

const INITIAL_CENTER = [2.15899, 41.38879];
const INITIAL_ZOOM = 10.12;

function MapBox() {
  const mapRef = useRef();
  const mapContainerRef = useRef();

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-guidance-night-v4",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    return () => {
      mapRef.current.remove();
    };
  }, []);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default MapBox;
