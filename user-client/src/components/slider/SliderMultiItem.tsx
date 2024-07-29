import { FC, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiChevronLeftCircle, BiChevronRightCircle } from "react-icons/bi";
import { MusicData } from "../../redux/useSlice/musicSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setSongData } from "../../redux/useSlice/musicRefSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  data: MusicData[];
}


const SliderMultiItem: FC<Props> = (prop) => {
  const sliderRef = useRef<Slider>(null); 
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

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

  const handleDetailMusic = (item: MusicData)=>
  {
    navigate(`/song/${item.song_id}`)
  }

  const handleDetailArtist = (item: MusicData)=>
  {
    navigate(`/artist`)
  }

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
        {prop.data.map((item) => (
          <div className="">
            <div>
              <img
                src="https://images2.thanhnien.vn/528068263637045248/2023/4/25/thai-hoang-55-16824107753271544271289.jpeg"
                className="w-[230px] h-[230px] object-cover"
                alt="Thai Hoang"
              />
            </div>
            <div>
              <h1 className="text-xl text-white font-bold hover:text-[#00ff00] cursor-pointer" onClick={()=>handleDetailMusic(item)}>{item.song_name}</h1>
              <h1 className="text-white font-semibold hover:text-[#00ff00] cursor-pointer" onClick={()=>handleDetailArtist(item)}>Thai Hoang</h1>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderMultiItem;
