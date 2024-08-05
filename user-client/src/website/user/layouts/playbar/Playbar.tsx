import { useEffect, useRef, useState } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  MusicRefSlice,
  setPlaybarState,
} from "../../../../redux/useSlice/musicRefSlice";

export default function Playbar() {
  const dispatch = useDispatch<AppDispatch>();
  const audioRef = useRef<AudioPlayer>(null);

  const musicData = useSelector((state: RootState) => state.musicRef);

  // handle play music with play button
  const handlePlay = () => {
    dispatch(setPlaybarState(true));
  };

  // handle pause music with pause button
  const handlePause = () => {
    dispatch(setPlaybarState(false));
  };

  // if isPlay is true, play music
  useEffect(() => {
    if (musicData.isPlay) {
      audioRef.current?.audio.current?.play();
    } else {
      audioRef.current?.audio.current?.pause();
    }
  }, [musicData.isPlay]);
  return (
    <>
      <div className="flex items-center w-full">
        <div className="bg-black p-2 flex items-center w-[30%]">
          <div className="w-[20%]">
            <img
              className="w-[60px] h-[60px] object-cover rounded-sm"
              src={musicData.songImage || ""}
            />
          </div>
          <div className="flex flex-col w-[80%]">
            <span className="text-white font-bold text-lg hover:text-[#00ff00] cursor-pointer">
              {musicData.songName || ""}
            </span>
            <div className="flex gap-2">
              {musicData.artists.map((item) => (
                <span className="text-white hover:text-[#00ff00] cursor-pointer">
                  {item.artist_name}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <AudioPlayer
            ref={audioRef}
            src={musicData.songPath || ""}
            style={{ background: "black" }}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
        <div className="w-[30%]"></div>
      </div>
    </>
  );
}
