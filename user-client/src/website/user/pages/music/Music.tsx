import { FC, useEffect, useState } from "react";
import SliderMultiItem from "../../../../components/slider/SliderMultiItem";
import { musicApi, suggestApi } from "../../../../apis";

export interface MusicData {
  song_id: string;
  song_name: string;
  song_image: string;
  song_path: string;
  artists: Artist[];
}

interface Artist {
  artist_id: string;
  artist_name: string;
}

const Music: FC = () => {
  const [data, setData] = useState<MusicData[]>([]);

  const fetchVinahouseSongsData = async () => {
    try {
      const response = await suggestApi.get<MusicData[]>("/vinahouse");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVinahouseSongsData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-20 p-4">
        <div>
          <SliderMultiItem title="Vinahouse bất diệt" data={data} />
        </div>
        {/* <div>
          <SliderMultiItem title="Bài hát nổi bật" />
        </div>
        <div>
            <SliderMultiItem title="Top 10 bài hát hay nhất" />
        </div> */}
      </div>
    </>
  );
};
export default Music;
