import { useEffect, useState, useRef } from "react";
import CRTSweep from "./CRTSweep.jsx";
import useGeoLocation from "../hooks/useGeoLocation";

const INSTRUCTIONS = [
  "1. POINT AVEUGLE\n* Trouve un poste d’observation discret ou en hauteur.\n* Observe les flux, les mouvements, les hésitations.\n* Repère une personne hors tempo, hors cadre.\n* Ralentis ta respiration jusqu’à disparaître.\n* Rejoins la foule en silence, comme si de rien n’était.",
  "2. COULEUR CIBLE\n* Choisis une couleur. Marche jusqu’à ce qu’elle apparaisse.\n* Observe celle ou celui qui la porte. Posture ? Allure ?\n* Synchronise ton pas sans jamais suivre.\n* Quand la couleur s’évanouit, capture ce qui reste.\n* Que dit cette image de toi aujourd’hui ?",
  "3. RÉPÉTITION FANTÔME\n* Avance jusqu’à percevoir un motif répété trois fois.\n* À chaque écho, progresse de 10 mètres.\n* Si le motif cesse, ferme les yeux 30 secondes.\n* Suis le son le plus présent, sans réfléchir.\n* Arrivé·e, note ce que ton corps ressent.",
  "4. OBJETS PERDUS\n* Repère un objet oublié, solitaire.\n* Observe-le longuement, comme une trace.\n* Invente son histoire, sa dernière mission, sa chute.\n* Écris une courte fiction ou laisse un message à côté.\n* Tu viens d’activer un récit dormant.",
  "5. RITUEL D’ASSEMBLAGE\n* Cueille trois éléments du sol, insignifiants mais précis.\n* Assemble-les selon une intuition ou un geste spontané.\n* Donne un nom à ce talisman : fonction, souvenir, sort.\n* Porte-le sur toi pendant ton déplacement.\n* En fin de trajet, enterre-le, ou laisse-le en offrande.",
  "6. LANGAGE DES GESTES\n* Observe les gestes récurrents des passants.\n* Choisis-en un. Imite-le discrètement dans ton propre corps.\n* Compose une phrase gestuelle de trois mouvements.\n* Danse-la en silence dans un lieu public.\n* Puis redeviens transparent·e.",
  "7. TRANSMISSION\n* Enregistre le son ambiant de ta position.\n* Croise une personne avec casque ou écouteurs.\n* Devine ce qu’elle écoute selon sa démarche.\n* Tente un échange simple : regard, sourire, mot.\n* Envoie ton propre son à un·e inconnu·e. Capsule transmise.",
];

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

  const handleCommand = (e) => {
    if (e.key === "Enter") {
      const cmd = e.target.value.trim().toLowerCase();
      let response = "";

      switch (cmd) {
        case "help":
          response =
            "Available commands: help, play, pause, instructions, locate, clear";
          break;
        case "play":
          audioRef.current?.play();
          response = "▶ Playing audio...";
          break;
        case "pause":
          audioRef.current?.pause();
          response = "⏸ Audio paused.";
          break;
        case "instructions":
          const quote =
            INSTRUCTIONS[Math.floor(Math.random() * INSTRUCTIONS.length)];
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

  useEffect(() => {
    const pick = INSTRUCTIONS[Math.floor(Math.random() * INSTRUCTIONS.length)];
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
      const newInstruction = Math.floor(Math.random() * INSTRUCTIONS.length);
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
      <div className="title">Activate Cities</div>
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
        {instructionIndex !== null && INSTRUCTIONS[instructionIndex]}
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
