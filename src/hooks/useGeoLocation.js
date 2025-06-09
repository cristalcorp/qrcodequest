// src/hooks/useGeoLocation.js
import { useEffect, useState } from "react";

export default function useGeoLocation() {
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
    label: null,
    method: null,
  });

  useEffect(() => {
    const fallbackIP = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setLocation({
          lat: data.latitude,
          lon: data.longitude,
          label: `${data.city}, ${data.country_name}`,
          method: "ip",
        });
      } catch {
        setLocation({ lat: null, lon: null, label: null, method: null });
      }
    };

    if (!navigator.geolocation) return fallbackIP();

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({
          lat: latitude,
          lon: longitude,
          label: `${latitude.toFixed(3)}, ${longitude.toFixed(3)}`,
          method: "gps",
        });
      },
      () => {
        fallbackIP();
      },
      { timeout: 3000 }
    );
  }, []);

  return location;
}
