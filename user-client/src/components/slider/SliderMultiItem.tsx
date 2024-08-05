import { FC, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { MusicData } from "../../website/user/pages/music/Music";

interface Props {
  title: string;
  data: MusicData[];
}

const SliderMultiItem: FC<Props> = (prop) => {
  console.log(prop.data);

  const sliderRef = useRef<Slider>(null);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
  };

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handleDetailMusic = (item: string) => {
    navigate(`/song/${item}`);
  };

  const handleDetailArtist = (item: string) => {
    navigate(`/artist/${item}`);
  };

  return (
    <div className="slider-container flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-white font-bold">{prop.title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="text-white text-4xl"
            onClick={handlePrevClick}
            aria-label="Previous Slide"
          >
            <BiChevronLeftCircle />
          </button>
          <button
            className="text-white text-4xl"
            onClick={handleNextClick}
            aria-label="Next Slide"
          >
            <BiChevronRightCircle />
          </button>
        </div>
      </div>
      <Slider {...settings} ref={sliderRef}>
        {prop.data.map((item1) => (
          <div className="">
            <div>
              <img
                src={item1.song_image}
                className="w-[230px] h-[230px] object-cover"
                alt="Thai Hoang"
              />
            </div>
            <div>
              <h1
                className="text-xl text-white font-bold hover:text-[#00ff00] cursor-pointer"
                onClick={() => handleDetailMusic(item1.song_id)}
              >
                {item1.song_name}
              </h1>
              <div className="flex items-center gap-2">
                {item1.artists.map((item2) => (
                  <h1
                    className="text-white font-semibold hover:text-[#00ff00] cursor-pointer"
                    onClick={() => handleDetailArtist(item2.artist_id)}
                  >
                    {item2.artist_name}
                  </h1>
                ))}
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderMultiItem;
