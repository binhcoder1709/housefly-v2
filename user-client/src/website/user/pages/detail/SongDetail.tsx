import { BiPlayCircle } from "react-icons/bi";
import GreenMark from "../../../../assets/icons/green mark.png";
import MusicList from "../../../../components/musicList/MusicList";
import { useParams } from "react-router-dom";
import { musicApi } from "../../../../apis";
import { useEffect, useState } from "react";

export default function SongDetail() {
  const [musicData, setMusicData] = useState({});
  console.log(musicData);
  
  const { id } = useParams();

  // call api to song detail
  const fetchSongDetail = async () => {
    try {
      const response = await musicApi.get(`/${id}`);
      setMusicData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSongDetail();
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
                Bài hát
              </span>
              <h1 className="text-white text-5xl font-bold">
                {musicData.song_name}
              </h1>
              <div className="flex gap-2 items-center">
                <button>
                  <BiPlayCircle className="text-[#00ff00] text-7xl" />
                </button>
                <span className="text-white text-lg font-semibold">
                  5 phút 8 giây
                </span>
              </div>
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
