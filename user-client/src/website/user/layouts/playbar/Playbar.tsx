import { useEffect, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";

export default function Playbar() {
  const [musicUrl, setMusicUrl] = useState<string>("");

  const musicData = useSelector((state: RootState) => state.musicRef);
  useEffect(() => {
    if (musicData.songPath) {
      setMusicUrl(musicData.songPath);
    }
  }, [musicData.songPath]);
  return (
    <>
      <AudioPlayer src={musicUrl} style={{ background: "black" }} />
    </>
  );
}
