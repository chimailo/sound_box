import React, { useState, useEffect, useCallback } from "react";
import "./styles.css";

const beatBox = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

export default function App() {
  const [display, setDisplay] = useState(null);

  return (
    <div className="App">
      <main id="drum-machine">
        <h2 className="title">Sound Box</h2>
        <small className="text">
          Click on any of the buttons below or press the letter on the buttons on your keyboard.
        </small>
        {beatBox.map((beat) => (
          <DrumPad
            id={beat.id}
            key={beat.keyTrigger}
            keyTrigger={beat.keyTrigger}
            src={beat.src}
            keyCode={beat.keyCode}
            handleDisplay={(display) => setDisplay(display)}
          />
        ))}
        <div id="display">{display}</div>
      </main>
    </div>
  );
}

function DrumPad({ id, src, keyTrigger, keyCode, handleDisplay }) {
  const [active, setActive] = useState(false);

  const playBeat = useCallback(() => {
    setActive(true);
    const sound = document.getElementById(keyTrigger);
    sound.play();
    handleDisplay(id);
    setActive(false);
  }, [keyTrigger, id, handleDisplay]);

  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      e.keyCode === keyCode && playBeat();
    });
    return () =>
      document.removeEventListener("keydown", (e) => {
        e.keyCode === keyCode && playBeat();
      });
  }, [keyCode, keyTrigger, playBeat]);

  return (
    <div
      onClick={playBeat}
      className={active ? "drun-pad active" : "drum-pad"}
      id={id}
    >
      <p>{keyTrigger}</p>
      <audio className="clip" id={keyTrigger} src={src} />
    </div>
  );
}
