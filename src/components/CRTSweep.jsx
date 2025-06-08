import { useEffect, useState } from "react";

export default function CRTSweep() {
  const [visible, setVisible] = useState(false);

  const ANIMATION_DURATION = 4000; // durée visible
  const INTERVAL = 20000;           // fréquence d'apparition

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), ANIMATION_DURATION);
    }, INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return visible ? (
    <div className="scanline-animated"></div>
  ) : null;
}
