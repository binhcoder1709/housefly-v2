import { FC, useState } from "react";
import "./css/style.css";
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiMusic,
  BiPlay,
} from "react-icons/bi";
import DropdownClick from "../dropdown/DropdownClick";
import { MenuProps } from "antd";
import { Link, useNavigate } from "react-router-dom";
import ModalPopup from "../modal/ModalPopup";
import { formatTimeSong } from "../../utils/formatTimeSong";

interface Props {
  data: ISong[];
  artistName: string;
  artistId: string;
}

interface ISong {
  song_id: string;
  song_name: string;
  song_path: string;
  song_duration: number;
}

const MusicList: FC<Props> = (prop) => {
  const [hoveredItems, setHoveredItems] = useState<{ [key: string]: boolean }>(
    {}
  );
  const navigate = useNavigate();

  const handleOkModal = () => {
    console.log("ok");
  };

  // time song format
  const formatTimeDuration = (duratuion: number) => {
    const time = formatTimeSong(duratuion);
    return time;
  };

  const musicOpt: MenuProps["items"] = [
    {
      label: <Link to={"#"}>Xem nghệ sĩ</Link>,
      key: "0",
    },
    {
      label: (
        <ModalPopup
          modalTitle="Thêm vào playlist"
          handleOk={handleOkModal}
          modalContent={
            <>
              <span>Đã thêm</span>
            </>
          }
          button={
            <>
              <button>Thêm vào playlist</button>
            </>
          }
        />
      ),
      key: "1",
    },
  ];

  const handleMouseEnter = (song_id: string) => {
    setHoveredItems((prev) => ({ ...prev, [song_id]: true }));
  };

  const handleMouseLeave = (song_id: string) => {
    setHoveredItems((prev) => ({ ...prev, [song_id]: false }));
  };

  return (
    <>
      <div className="flex flex-col">
        {prop.data.map((item) => (
          <div
            key={item.song_id}
            className="flex items-center justify-between music-item p-2 rounded-lg"
            onMouseEnter={() => handleMouseEnter(item.song_id)}
            onMouseLeave={() => handleMouseLeave(item.song_id)}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-2 items-center">
                {hoveredItems[item.song_id] ? (
                  <BiPlay
                    className="cursor-pointer text-3xl text-white"
                    id="musicIcon"
                  />
                ) : (
                  <BiMusic className="text-3xl text-white" id="musicIcon" />
                )}
                <img
                  className="w-[40px] h-[40px] object-cover object-top"
                  src="https://images2.thanhnien.vn/528068263637045248/2023/4/25/thai-hoang-5-1682410775291631820128.jpeg"
                  alt=""
                />
              </div>
              <div>
                <p
                  className="text-white text-lg font-semibold cursor-pointer"
                  onClick={() => navigate(`/song/${item.song_id}`)}
                >
                  {item.song_name}
                </p>
                <p
                  className="text-white cursor-pointer font-medium"
                  onClick={() => navigate(`/artist/${prop.artistId}`)}
                >
                  {prop.artistName}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div>
                <span
                  id="vipIcon"
                  className="bg-[#00ff00] p-[5px] px-4 rounded-lg"
                >
                  VIP
                </span>
              </div>
              <div>
                <span className="text-white font-semibold">
                  {formatTimeDuration(item.song_duration)}
                </span>
              </div>
              <div>
                <button>
                  <BiHeart className="text-[#00ff00] text-2xl" id="heartIcon" />
                </button>
              </div>
              <div>
                <DropdownClick
                  clickBtn={
                    <button>
                      <BiDotsHorizontalRounded
                        className="text-[#00ff00] text-2xl"
                        id="threeDotIcon"
                      />
                    </button>
                  }
                  items={musicOpt}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MusicList;
