import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";
import useFetchEvent from "@/hooks/use-fetch-event";
import mapIcon from "@/assets/map-icon.webp";
import { FeatureCollection, Geometry, GeoJsonProperties } from "geojson";
const INITIAL_CENTER: [number, number] = [2.15899, 41.38879];
const INITIAL_ZOOM = 10.12;

interface Event {
  title: string;
  description: string;
  longitude: number;
  latitude: number;
}

interface GeoJsonData extends FeatureCollection<Geometry, GeoJsonProperties> {
  features: {
    type: "Feature";
    geometry: {
      type: "Point";
      coordinates: [number, number];
    };
    properties: {
      title: string;
      description: string;
    };
  }[];
}

const convertToGeoJson = (events: Event[]): GeoJsonData => {
  return {
    type: "FeatureCollection",
    features: events.map((event) => ({
      type: "Feature",
      properties: {
        title: event.title,
        description: event.description,
      },
      geometry: {
        type: "Point",
        coordinates: [event.longitude, event.latitude],
      },
    })),
  };
};

const MapBox = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const { data } = useFetchEvent("api/event");

  const geoJson = convertToGeoJson(data);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapboxgl.accessToken = import.meta.env.VITE_APP_MAP_TOKEN;
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/navigation-guidance-night-v4",
      center: INITIAL_CENTER,
      zoom: INITIAL_ZOOM,
    });

    const map = mapRef.current;

    map.on("load", () => {
      map.addSource("events", {
        type: "geojson",
        data: geoJson,
      });

      map.loadImage(
        mapIcon,
        (error: Error | undefined, image: HTMLImageElement | undefined) => {
          if (error) throw error;
          if (!image || !map) return;

          map.addImage("custom-icon", image);

          map.addLayer({
            id: "events-layer",
            type: "symbol",
            source: "events",
            layout: {
              "icon-image": "custom-icon",
              "icon-size": 0.15,
              "icon-allow-overlap": true,
            },
          });

          map.on(
            "click",
            "events-layer",
            (
              e: mapboxgl.MapMouseEvent & {
                features?: mapboxgl.GeoJSONFeature[];
              }
            ) => {
              if (!e.features?.length) return;

              const coordinates: [number, number] | null =
                e.features[0].geometry.type === "Point"
                  ? ((
                      e.features[0].geometry.coordinates as [number, number]
                    ).slice() as [number, number])
                  : null;

              if (!coordinates) return;

              const { title, description } = e.features[0].properties as {
                title: string;
                description: string;
              };

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(
                  `<div style="background-color: #18181b; color: white; padding: 10px; border-radius: 5px;">
                <h3>${title}</h3>
                <p>${description}</p>
              </div>`
                )
                .addTo(map);
            }
          );

          map.on("mouseenter", "events-layer", () => {
            if (map.getCanvas()) {
              map.getCanvas().style.cursor = "pointer";
            }
          });

          map.on("mouseleave", "events-layer", () => {
            if (map.getCanvas()) {
              map.getCanvas().style.cursor = "";
            }
          });
        }
      );
    });

    return () => {
      map.remove();
    };
  }, [geoJson]);

  return <div id="map-container" ref={mapContainerRef} />;
};

export default MapBox;
