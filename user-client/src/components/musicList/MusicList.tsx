import { useState } from "react";
import "./css/style.css";
import {
  BiDotsHorizontalRounded,
  BiHeart,
  BiMusic,
  BiPlay,
} from "react-icons/bi";
import DropdownClick from "../dropdown/DropdownClick";
import { MenuProps } from "antd";
import { Link } from "react-router-dom";
import ModalPopup from "../modal/ModalPopup";

export default function MusicList() {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleOkModal = () => {
    console.log("ok");
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
  return (
    <>
      <div className="flex flex-col">
        <div
          className="flex items-center justify-between music-item p-2 rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              {isHovered ? (
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
              <p className="text-white text-lg font-semibold">
                Nonstop thasi hoafng 1
              </p>
              <p className="text-white  font-medium">Thai Hoang</p>
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
              <span className="text-white font-semibold">16:20:20</span>
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
        <div
          className="flex items-center justify-between music-item p-2 rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              {isHovered ? (
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
              <p className="text-white text-lg font-semibold">
                Nonstop thasi hoafng 1
              </p>
              <p className="text-white  font-medium">Thai Hoang</p>
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
              <span className="text-white font-semibold">16:20:20</span>
            </div>
            <div>
              <button>
                <BiHeart className="text-[#00ff00] text-2xl" id="heartIcon" />
              </button>
            </div>
            <div>
              <button>
                <BiDotsHorizontalRounded
                  className="text-[#00ff00] text-2xl"
                  id="threeDotIcon"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-between music-item p-2 rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              {isHovered ? (
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
              <p className="text-white text-lg font-semibold">
                Nonstop thasi hoafng 1
              </p>
              <p className="text-white  font-medium">Thai Hoang</p>
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
              <span className="text-white font-semibold">16:20:20</span>
            </div>
            <div>
              <button>
                <BiHeart className="text-[#00ff00] text-2xl" id="heartIcon" />
              </button>
            </div>
            <div>
              <button>
                <BiDotsHorizontalRounded
                  className="text-[#00ff00] text-2xl"
                  id="threeDotIcon"
                />
              </button>
            </div>
          </div>
        </div>
        <div
          className="flex items-center justify-between music-item p-2 rounded-lg"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="flex items-center gap-2">
            <div className="flex gap-2 items-center">
              {isHovered ? (
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
              <p className="text-white text-lg font-semibold">
                Nonstop thasi hoafng 1
              </p>
              <p className="text-white  font-medium">Thai Hoang</p>
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
              <span className="text-white font-semibold">16:20:20</span>
            </div>
            <div>
              <button>
                <BiHeart className="text-[#00ff00] text-2xl" id="heartIcon" />
              </button>
            </div>
            <div>
              <button>
                <BiDotsHorizontalRounded
                  className="text-[#00ff00] text-2xl"
                  id="threeDotIcon"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
