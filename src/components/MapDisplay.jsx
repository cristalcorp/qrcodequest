// src/components/MapDisplay.jsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const GPS_POINTS = [
  { name: "Paris", lat: 48.8566, lon: 2.3522 },
  { name: "Berlin", lat: 52.52, lon: 13.405 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503 },
];

export default function MapDisplay({ userLocation = null }) {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false,
        dragging: false,
        scrollWheelZoom: false,
      }).setView([20, 0], 2);

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png", {
        subdomains: "abcd",
        opacity: 1,
      }).addTo(map);

      GPS_POINTS.forEach((pt) => {
        L.circleMarker([pt.lat, pt.lon], {
          radius: 4,
          color: "#ffffff",
          fillColor: "#ffffff",
          fillOpacity: 1,
          weight: 1,
        }).addTo(map);
      });

      if (userLocation) {
        const userLatLng = [userLocation.lat, userLocation.lon];
        L.circleMarker(userLatLng, {
          radius: 6,
          color: "#ff0",
          fillColor: "#ff0",
          fillOpacity: 1,
        }).addTo(map);
        map.setView(userLatLng, 6);
      }

      return () => map.remove();
    }
  }, [userLocation]);

  return <div ref={mapRef} className="map-container"></div>;
}
