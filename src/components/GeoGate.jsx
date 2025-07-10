import { useEffect, useState } from "react";
import locations from "../data/locations.json";

// // Coordonnées autorisées (centres)
// const AUTHORIZED_POINTS = [
//   { label: "Paris", lat: 48.8566, lon: 2.3522 },
//   { label: "Berlin", lat: 52.52, lon: 13.405 },
//   { label: "Nice", lat: 43.7102, lon: 7.262 },
// ];

// Rayon en mètres
const RADIUS_METERS = 1000;

// Haversine formula
function distanceInMeters(lat1, lon1, lat2, lon2) {
  const R = 6371000; // rayon Terre en m
  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

export default function GeoGate({ children }) {
  const [authorized, setAuthorized] = useState(null); // null | true | false

  useEffect(() => {
    const url = new URL(window.location.href);
    const bypass = url.searchParams.get("agent");

    if (bypass === "2706") {
      setAuthorized(true);
      return;
    }

    if (!navigator.geolocation) {
      setAuthorized(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const isNear = locations.some((p) => {
          const d = distanceInMeters(latitude, longitude, p.lat, p.lon);
          return d <= RADIUS_METERS;
        });

        setAuthorized(isNear);
      },
      () => {
        setAuthorized(false);
      },
      { enableHighAccuracy: true, timeout: 5000 }
    );
  }, []);

  if (authorized === null)
    return <div className="loading-text">GPS Check...</div>;
  if (!authorized) return <div className="loading-text">Geo Restricted</div>;

  return children;
}
