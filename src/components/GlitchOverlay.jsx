import { useEffect, useState } from "react";

export default function GlitchOverlay({ interval = 15000, duration = 300 }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const glitchLoop = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), duration);
    }, interval);

    return () => clearInterval(glitchLoop);
  }, [interval, duration]);

  return glitch ? <div className="glitch-overlay" /> : null;
} 