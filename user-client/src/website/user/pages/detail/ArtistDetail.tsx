import { useEffect, useState } from "react";
import GreenMark from "../../../../assets/icons/green mark.png";
import MusicList from "../../../../components/musicList/MusicList";
import { useParams } from "react-router-dom";
import { artistApi } from "../../../../apis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { formatTimeSong } from "../../../../utils/formatTimeSong";

interface IArtist {
  artist_id: string;
  artist_name: string;
}

interface ISong {
  song_id: string;
  song_name: string;
  song_path: string;
  song_duration: number;
}

export default function ArtistDetail() {
  const [artistData, setArtistData] = useState<IArtist>({} as IArtist);
  const [songsOfArtist, setSongsOfArtist] = useState<ISong[]>([] as ISong[]);
  
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  // call api to artist detail
  const fetchArtistDetail = async () => {
    try {
      const response = await artistApi.get<IArtist>(`${id}`);
      setArtistData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  // call api to get songs of artist
  const fetchSongsOfArtist = async () => {
    try {
      const response = await artistApi.get<ISong[]>(`/${id}/songs`);
      setSongsOfArtist(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchArtistDetail();
    fetchSongsOfArtist();
  }, []);
  return (
    <>
      <div className="w-full">
        <div className="w-full h-[350px] bg-[#010048] p-4 flex flex-col justify-end">
          <div className="flex gap-2 items-center">
            <div>
              <img
                src="https://images2.thanhnien.vn/528068263637045248/2023/4/25/thai-hoang-55-16824107753271544271289.jpeg"
                className="rounded-full object-cover w-[200px] h-[200px]"
                alt=""
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-white text-xl font-semibold flex gap-2 items-center">
                Nghệ sĩ đã xác minh{" "}
                <img className="w-[20px] h-[20px]" src={GreenMark} alt="" />
              </span>
              <h1 className="text-white text-5xl font-bold">
                {artistData.artist_name}
              </h1>
              <span className="text-white text-lg font-semibold">
                {songsOfArtist.length} bài hát
              </span>
            </div>
          </div>
        </div>
        <div className="p-3">
          <div>
            <h1 className="text-white text-3xl font-bold">Bài hát nổi bật</h1>
          </div>
          <div>
            <MusicList data={songsOfArtist} artistName={artistData.artist_name} artistId={artistData.artist_id}/>
          </div>
        </div>
      </div>
    </>
  );
}
