import s from "./App.module.css";
import TugieAudio from "./assets/audio/tugie.mp3";
import Asterisk from "./assets/images/asterisk.png";

function App() {
  const audioPlayer = new Audio(TugieAudio);
  audioPlayer.loop = true;
  audioPlayer.autoplay = true;
  const playAudio = () => {
    audioPlayer.play();
  };

  return (
    <>
      <main className={s["tugie"]}>
        <h1 className={s["tugie__title"]}>Тугие Ануса</h1>
        <div className={s["tugie__circle"]} onClick={playAudio}>
          <img
            className={s["tugie__asterisk"]}
            width={48}
            height={48}
            src={Asterisk}
          />
        </div>
      </main>
    </>
  );
}

export default App;
