import { useEffect, useState, useRef } from "react";
import CRTSweep from "./CRTSweep.jsx";
import useGeoLocation from "../hooks/useGeoLocation";
import instructionsRaw from "../data/instructions.json";
import locations from "../data/locations.json";


const TRACKS = [
  "/audio/huburnulation.mp3",
  "/audio/ultrafiliation.mp3",
  "/audio/surespirable.mp3",
  "/audio/resistransition.mp3",
  "/audio/resistransition.mp3",
  "/audio/predisparadis.mp3",
];

export default function TerminalShell() {
  const { lat, lon, label, method } = useGeoLocation();
  const [history, setHistory] = useState([]);
  const inputRef = useRef(null);
  const audioRef = useRef(null);
  const [randomInstruction, setRandomInstruction] = useState("");
  const [locationStatus, setLocationStatus] = useState("loading"); // 'loading', 'ready'
  const [musicIndex, setMusicIndex] = useState(null);
  const [instructionIndex, setInstructionIndex] = useState(null);

  const [showMap, setShowMap] = useState(false);
  const [centerOnUser, setCenterOnUser] = useState(false);

  const isFrench =
    typeof navigator !== "undefined" &&
    navigator.language?.toLowerCase().startsWith("fr");

  const instructions = instructionsRaw
    .filter((item) => item.lang === (isFrench ? "fr" : "en"))
    .map((item) => `${item.id}. ${item.title}\n* ${item.steps.join("\n* ")}`);

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = e.target.value.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response =
            "Available commands: help, play, pause, map, locate, floxpox, clear";
          break;
        case "floxpox":
          response =
            "https://websim.com/@HyperTransit/esoteric-terminal/7";
          break;
        case "play":
          audioRef.current?.play();
          response = "▶ Playing audio...";
          break;
        case "pause":
          audioRef.current?.pause();
          response = "⏸ Audio paused.";
          break;
        case "map":
          response = Object.entries(locations)
            .map(([city, coords]) => {
              const lines = coords.map(
                ([lat, lon]) => `${lat.toFixed(4)}, ${lon.toFixed(4)}`
              );
              return `[${city}]\n` + lines.join("\n");
            })
            .join("\n\n");
          break;

        case "locate":
          if (!lat || !lon) {
            response = "⏳ Location not ready.";
            break;
          }

          let closestCity = null;
          let closestPoint = null;
          let minDistance = Infinity;

          for (const [city, coords] of Object.entries(locations)) {
            for (const [clat, clon] of coords) {
              const dist = Math.sqrt(
                Math.pow(clat - lat, 2) + Math.pow(clon - lon, 2)
              );

              if (dist < minDistance) {
                minDistance = dist;
                closestCity = city;
                closestPoint = [clat, clon];
              }
            }
          }

          if (closestCity && closestPoint) {
            response = `[${closestCity}]\n${closestPoint[0]}, ${closestPoint[1]}`;
          } else {
            response = "❌ No locations available.";
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

  useEffect(() => {
    const pick = instructions[Math.floor(Math.random() * instructions.length)];
    setRandomInstruction(pick);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLocationStatus("ready");
    }, 3000);
    return () => clearTimeout(timer);
  }, [label, method]);

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10); // ex: '2025-06-20'
    const saved = JSON.parse(localStorage.getItem("dailySeed"));

    if (saved && saved.date === today) {
      setInstructionIndex(saved.instructionIndex);
      setMusicIndex(saved.musicIndex);
    } else {
      const newInstruction = Math.floor(Math.random() * instructions.length);
      const newMusic = Math.floor(Math.random() * TRACKS.length);

      localStorage.setItem(
        "dailySeed",
        JSON.stringify({
          date: today,
          instructionIndex: newInstruction,
          musicIndex: newMusic,
        })
      );

      setInstructionIndex(newInstruction);
      setMusicIndex(newMusic);
    }
  }, []);

  return (
    <div className="term-o-rama">
      {/* <div className="title">Activate Cities</div> */}
      <img src="/title_ascii.png" className="img_title"></img>
      <div className="central-row">
        <img src="/qr/uptonpark.png" alt="QR code" className="qr-code" />
        <div className="loading-text">
          {locationStatus === "loading" ? (
            <>
              Loading location<span className="dots"></span>
            </>
          ) : (
            <>
              📍 Location: {label || "Unknown"} ({method})
            </>
          )}
        </div>
      </div>

      <div className="random-instruction">
        {instructionIndex !== null && instructions[instructionIndex]}
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
        placeholder="> type play to start music or help for commands"
        onKeyDown={handleCommand}
      />

      {musicIndex !== null && (
        <audio autoPlay loop hidden ref={audioRef}>
          <source src={TRACKS[musicIndex]} type="audio/mp3" />
        </audio>
      )}

      <CRTSweep />
    </div>
  );
}
