import { BiPauseCircle, BiPlayCircle } from "react-icons/bi";
import GreenMark from "../../../../assets/icons/green mark.png";
import MusicList from "../../../../components/musicList/MusicList";
import { useNavigate, useParams } from "react-router-dom";
import { musicApi } from "../../../../apis";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import {
  setPlaybarState,
  setSongData,
} from "../../../../redux/useSlice/musicRefSlice";
import jsCookies from 'js-cookie'

interface ISong {
  song_id: string;
  song_name: string;
  song_image: string;
  song_path: string;
}

interface IArtist {
  artist_id: string;
  artist_name: string;
}

export default function SongDetail() {
  const [songDetailData, setSongDetailData] = useState<ISong>({} as ISong);
  const [songArtistData, setSongArtistData] = useState<IArtist[]>(
    [] as IArtist[]
  );
  const [playButtonState, setPlayButtonState] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { id } = useParams();
  const musicRef = useSelector((state: RootState) => state.musicRef);

  // call api to song detail
  const fetchSongDetail = async () => {
    try {
      const response = await musicApi.get<ISong>(`/${id}`)
      setSongDetailData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // fetch artist data
  const fetchArtist = async () => {
    try {
      const response = await musicApi.get<IArtist[]>(`/${id}/artists`);
      setSongArtistData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // handle play music with play button
  const handlePlay = () => {
    // if music ref in redux have data and song id is same, set playbar state to true
    if (musicRef && musicRef.songId === songDetailData.song_id) {
      dispatch(setPlaybarState(true));
    }
    // if music ref in redux have data or dont have data but song id is not same, set song data to redux
    else {
      dispatch(
        setSongData({
          songId: songDetailData.song_id,
          songName: songDetailData.song_name,
          songPath: songDetailData.song_path,
          songImage: songDetailData.song_image,
          artists: songArtistData,
        })
      );
    }
  };

  // handle pause music with pause button
  const handlePause = () => {
    dispatch(setPlaybarState(false));
  };

  useEffect(() => {
    fetchSongDetail();
    fetchArtist();
  }, []);

  // if song id in redux and song id in url is same , set play button state with isPlay state in redux
  useEffect(() => {
    if (musicRef.songId === songDetailData.song_id) {
      if (musicRef.isPlay) {
        setPlayButtonState(true);
      } else if (!musicRef.isPlay) {
        setPlayButtonState(false);
      }
    }
  }, [musicRef.songId, musicRef.isPlay, songDetailData]);
  return (
    <>
      <div className="w-full">
        <div className="w-full h-[350px] bg-[#010048] p-4 flex flex-col justify-end">
          <div className="flex gap-2 items-center">
            <div>
              <img
                src={songDetailData.song_image}
                className="rounded-full object-cover w-[300px] h-[300px]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white text-xl font-semibold flex gap-2 items-center">
                Bài hát
              </span>
              <h1 className="text-white text-5xl font-bold">
                {songDetailData.song_name}
              </h1>
              <div className="flex gap-2">
                {songArtistData.map((item) => (
                  <span
                    onClick={() => navigate(`/artist/${item.artist_id}`)}
                    className="text-white text-lg font-semibold hover:text-[#00ff00] cursor-pointer"
                  >
                    {item.artist_name}
                  </span>
                ))}
              </div>
              <button>
                {playButtonState === false ? (
                  <BiPlayCircle
                    className="text-[#00ff00] text-7xl"
                    onClick={handlePlay}
                  />
                ) : (
                  <BiPauseCircle
                    className="text-[#00ff00] text-7xl"
                    onClick={handlePause}
                  />
                )}
              </button>
            </div>
          </div>
        </div>
        {/* <div className="p-3">
          <div>
            <h1 className="text-white text-3xl font-bold">Bài hát nổi bật</h1>
          </div>
          <div>
            <MusicList/>
          </div>
        </div> */}
      </div>
    </>
  );
}
