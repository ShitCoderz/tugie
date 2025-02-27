import { useRef } from "react";
import s from "./App.module.css";
import TugieAudio from "./assets/audio/tugie.mp3";
import Asterisk from "./assets/images/asterisk.png";

function App() {
  const circleElement = useRef<HTMLDivElement>(null);
  let isPlaying = false;

  const audioElement = new Audio(TugieAudio);
  audioElement.loop = true;

  const playAudio = () => {
    if (isPlaying) return;
    isPlaying = true;

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const source = audioContext.createMediaElementSource(audioElement);
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    audioElement.play();
    animate();

    function animate() {
      requestAnimationFrame(animate);
      analyser.getByteTimeDomainData(dataArray);

      let sum = 0;
      for (let i = 0; i < bufferLength; i++) {
        sum += Math.abs(dataArray[i] - 128);
      }
      const averageAmplitude = sum / bufferLength;

      if (averageAmplitude > 20) {
        pulseVisualizer();
      }
    }

    function pulseVisualizer() {
      if (circleElement.current) {
        circleElement.current.style.transform = "scale(1.25)";
        setTimeout(
          () => (circleElement.current!.style.transform = "scale(1)"),
          100
        );
      }
    }
  };

  return (
    <>
      <main className={s["tugie"]}>
        <h1 className={s["tugie__title"]}>Тугие Ануса</h1>
        <div
          className={s["tugie__circle"]}
          onClick={playAudio}
          ref={circleElement}
        >
          <img
            className={s["tugie__asterisk"]}
            width={48}
            height={48}
            src={Asterisk}
          />
        </div>
      </main>

      <div className="testometrika_widget" id="cszokgef"></div>
    </>
  );
}

export default App;
