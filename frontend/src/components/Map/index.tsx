/* eslint-disable */
// @ts-nocheck

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import useFetchEvent from "@/hooks/use-fetch-event";
import mapIcon from "@/assets/map-icon.webp";

const INITIAL_CENTER = [2.15899, 41.38879];
const INITIAL_ZOOM = 10.12;

function MapBox() {
  const mapRef = useRef();
  const mapContainerRef = useRef();
  const { data, loading, error } = useFetchEvent("api/event");

  const convertToGeoJson = (events) => {
    return {
      type: "FeatureCollection",
      features: events.map((event) => ({
        type: "Event",
        properties: {
          title: event.title,
          description: event.description,
        },
        geometry: {
          type: "Point",
          coordinates: [Number(event.longitude), Number(event.latitude)],
        },
      })),
    };
  };

  const geoJson = convertToGeoJson(data);
  console.log(geoJson);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-guidance-night-v4",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    mapRef.current.on("load", () => {
      mapRef.current.addSource("events", {
        type: "geojson",
        data: geoJson,
      });

      mapRef.current.loadImage(mapIcon, (error, image) => {
        if (error) throw error;
        mapRef.current.addImage("custom-icon", image);

        mapRef.current.addLayer({
          id: "events-layer",
          type: "symbol",
          source: "events",
          layout: {
            "icon-image": "custom-icon",
            "icon-size": 0.15,
            "icon-allow-overlap": true,
          },
        });

        mapRef.current.on("click", "events-layer", (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const { title, description } = e.features[0].properties;

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              `<div style="background-color: #18181b; color: white; padding: 10px; border-radius: 5px;">
                <h3>${title}</h3>
                <p>${description}</p>
              </div>`
            )
            .addTo(mapRef.current);
        });

        mapRef.current.on("mouseenter", "events-layer", () => {
          mapRef.current.getCanvas().style.cursor = "pointer";
        });

        mapRef.current.on("mouseleave", "events-layer", () => {
          mapRef.current.getCanvas().style.cursor = "";
        });
      });
    });

    return () => {
      mapRef.current.remove();
    };
  }, [geoJson]);

  return (
    <>
      <div id="map-container" ref={mapContainerRef} />
    </>
  );
}

export default MapBox;
