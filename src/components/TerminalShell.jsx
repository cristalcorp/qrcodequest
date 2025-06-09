import { useEffect, useState, useRef } from "react";
import CRTSweep from "./CRTSweep.jsx";
import useGeoLocation from "../hooks/useGeoLocation";


const QUOTES = [
  "« Le silence est fait de paroles que l’on n’a pas dites. » – Marcel Pagnol",
  "« Celui qui a déplacé la montagne, c’est celui qui a commencé par enlever les petites pierres. » – Confucius",
  "« Le réel est toujours poétique. » – Christian Bobin",
  "« Tout est possible à celui qui rêve, ose, travaille et n’abandonne jamais. » – Xavier Dolan",
  "« Art is the lie that enables us to realize the truth. » – Pablo Picasso",
];

export default function TerminalShell() {
  const { lat, lon, label, method } = useGeoLocation();
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const audioRef = useRef(null);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = e.target.value.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response = "Available commands: help, play, pause, read, clear";
          break;
        case "play":
          audioRef.current?.play();
          response = "▶ Playing audio...";
          break;
        case "pause":
          audioRef.current?.pause();
          response = "⏸ Audio paused.";
          break;
        case "read":
          const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
          response = quote;
          break;
        case "locate":
          if (label) {
            response = `📍 Location: ${label} (${method})`;
          } else {
            response = "⏳ Detecting location...";
          }
          break;

        case "clear":
          setHistory([]);
          e.target.value = "";
          return;
        default:
          response = `Command not found: ${cmd}`;
      }

      setHistory((prev) => [...prev, `> ${cmd}`, response]);
      e.target.value = "";
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="terminal">
      <div className="title">Q[R|U]EST CODE</div>
      <div className="qr-row">
        <img src="/qrcodequest/qr/kirikoo.png" alt="QR code" className="qr" />
        <div className="loading-text">
          Loading location<span className="dots"></span>
        </div>
      </div>

      {history.map((line, idx) => (
        <div key={idx} className="output-line">
          {line}
        </div>
      ))}

      <input
        ref={inputRef}
        type="text"
        className="cli"
        placeholder="> type a command"
        onKeyDown={handleCommand}
      />

      <audio ref={audioRef} autoPlay hidden>
        {/* <source src="/audio/northern-winds.mp3" type="audio/mp3" /> */}
      </audio>

      <CRTSweep />
    </div>
  );
}
