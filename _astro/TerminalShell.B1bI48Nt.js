import{r as n}from"./index.BVOCwoKb.js";var v={exports:{}},h={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var R;function A(){if(R)return h;R=1;var d=Symbol.for("react.transitional.element"),l=Symbol.for("react.fragment");function a(i,e,s){var m=null;if(s!==void 0&&(m=""+s),e.key!==void 0&&(m=""+e.key),"key"in e){s={};for(var c in e)c!=="key"&&(s[c]=e[c])}else s=e;return e=s.ref,{$$typeof:d,type:i,key:m,ref:e!==void 0?e:null,props:s}}return h.Fragment=l,h.jsx=a,h.jsxs=a,h}var I;function q(){return I||(I=1,v.exports=A()),v.exports}var t=q();function C(){const[d,l]=n.useState(!1),a=4e3,i=2e4;return n.useEffect(()=>{const e=setInterval(()=>{l(!0),setTimeout(()=>l(!1),a)},i);return()=>clearInterval(e)},[]),d?t.jsx("div",{className:"scanline-animated"}):null}function M(){const[d,l]=n.useState({lat:null,lon:null,label:null,method:null});return n.useEffect(()=>{const a=async()=>{try{const e=await(await fetch("https://ipapi.co/json/")).json();l({lat:e.latitude,lon:e.longitude,label:`${e.city}, ${e.country_name}`,method:"ip"})}catch{l({lat:null,lon:null,label:null,method:null})}};if(!navigator.geolocation)return a();navigator.geolocation.getCurrentPosition(i=>{const{latitude:e,longitude:s}=i.coords;l({lat:e,lon:s,label:`${e.toFixed(3)}, ${s.toFixed(3)}`,method:"gps"})},()=>{a()},{timeout:3e3})},[]),d}const p=[`1. POINT AVEUGLE
* Trouve un poste d’observation discret ou en hauteur.
* Observe les flux, les mouvements, les hésitations.
* Repère une personne hors tempo, hors cadre.
* Ralentis ta respiration jusqu’à disparaître.
* Rejoins la foule en silence, comme si de rien n’était.`,`2. COULEUR CIBLE
* Choisis une couleur. Marche jusqu’à ce qu’elle apparaisse.
* Observe celle ou celui qui la porte. Posture ? Allure ?
* Synchronise ton pas sans jamais suivre.
* Quand la couleur s’évanouit, capture ce qui reste.
* Que dit cette image de toi aujourd’hui ?`,`3. RÉPÉTITION FANTÔME
* Avance jusqu’à percevoir un motif répété trois fois.
* À chaque écho, progresse de 10 mètres.
* Si le motif cesse, ferme les yeux 30 secondes.
* Suis le son le plus présent, sans réfléchir.
* Arrivé·e, note ce que ton corps ressent.`,`4. OBJETS PERDUS
* Repère un objet oublié, solitaire.
* Observe-le longuement, comme une trace.
* Invente son histoire, sa dernière mission, sa chute.
* Écris une courte fiction ou laisse un message à côté.
* Tu viens d’activer un récit dormant.`,`5. RITUEL D’ASSEMBLAGE
* Cueille trois éléments du sol, insignifiants mais précis.
* Assemble-les selon une intuition ou un geste spontané.
* Donne un nom à ce talisman : fonction, souvenir, sort.
* Porte-le sur toi pendant ton déplacement.
* En fin de trajet, enterre-le, ou laisse-le en offrande.`,`6. LANGAGE DES GESTES
* Observe les gestes récurrents des passants.
* Choisis-en un. Imite-le discrètement dans ton propre corps.
* Compose une phrase gestuelle de trois mouvements.
* Danse-la en silence dans un lieu public.
* Puis redeviens transparent·e.`,`7. TRANSMISSION
* Enregistre le son ambiant de ta position.
* Croise une personne avec casque ou écouteurs.
* Devine ce qu’elle écoute selon sa démarche.
* Tente un échange simple : regard, sourire, mot.
* Envoie ton propre son à un·e inconnu·e. Capsule transmise.`],j=["/audio/huburnulation.mp3","/audio/ultrafiliation.mp3","/audio/surespirable.mp3","/audio/resistransition.mp3","/audio/resistransition.mp3","/audio/predisparadis.mp3"];function O(){const{lat:d,lon:l,label:a,method:i}=M(),[e,s]=n.useState([]),m=n.useRef(null),c=n.useRef(null),[k,T]=n.useState(""),[N,b]=n.useState("loading"),[x,S]=n.useState(null),[g,E]=n.useState(null),y=o=>{if(o.key==="Enter"){const u=o.target.value.trim().toLowerCase();let r="";switch(u){case"help":r="Available commands: help, play, pause, instructions, locate, clear";break;case"play":c.current?.play(),r="▶ Playing audio...";break;case"pause":c.current?.pause(),r="⏸ Audio paused.";break;case"instructions":r=p[Math.floor(Math.random()*p.length)];break;case"locate":a?r=`📍 Location: ${a} (${i})`:r="⏳ Detecting location...";break;case"clear":s([]),o.target.value="";return;default:r=`Command not found: ${u}`}s(f=>[...f,`> ${u}`,r]),o.target.value=""}};return n.useEffect(()=>{m.current?.focus()},[]),n.useEffect(()=>{const o=p[Math.floor(Math.random()*p.length)];T(o)},[]),n.useEffect(()=>{const o=setTimeout(()=>{b("ready")},3e3);return()=>clearTimeout(o)},[a,i]),n.useEffect(()=>{const o=new Date().toISOString().slice(0,10),u=JSON.parse(localStorage.getItem("dailySeed"));if(u&&u.date===o)E(u.instructionIndex),S(u.musicIndex);else{const r=Math.floor(Math.random()*p.length),f=Math.floor(Math.random()*j.length);localStorage.setItem("dailySeed",JSON.stringify({date:o,instructionIndex:r,musicIndex:f})),E(r),S(f)}},[]),t.jsxs("div",{className:"term-o-rama",children:[t.jsx("div",{className:"title",children:"Activate Cities"}),t.jsxs("div",{className:"central-row",children:[t.jsx("img",{src:"/qr/uptonpark.png",alt:"QR code",className:"qr-code"}),t.jsx("div",{className:"loading-text",children:N==="loading"?t.jsxs(t.Fragment,{children:["Loading location",t.jsx("span",{className:"dots"})]}):t.jsxs(t.Fragment,{children:["📍 Location: ",a||"Unknown"," (",i,")"]})})]}),t.jsx("div",{className:"random-instruction",children:g!==null&&p[g]}),e.map((o,u)=>t.jsx("div",{className:"output-line",children:o},u)),t.jsx("input",{ref:m,type:"text",className:"cli",placeholder:"> type play to start music or help for commands",onKeyDown:y}),x!==null&&t.jsx("audio",{autoPlay:!0,loop:!0,hidden:!0,ref:c,children:t.jsx("source",{src:j[x],type:"audio/mp3"})}),t.jsx(C,{})]})}export{O as default};
