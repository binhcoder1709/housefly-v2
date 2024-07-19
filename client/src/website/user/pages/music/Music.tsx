import { FC } from "react";
import SliderMultiItem from "../../../../components/slider/SliderMultiItem";

const Music: FC = () => {
  return (
    <>
      <div className="flex flex-col gap-20 p-4">
        <div>
          <SliderMultiItem title="Bài hát nổi bật" />
        </div>
        <div>
            <SliderMultiItem title="Top 10 bài hát hay nhất" />
        </div>
      </div>
    </>
  );
};
export default Music;
