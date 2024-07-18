import React from "react";
import {
  BiLibrary,
  BiPlus,
  BiRightArrow,
  BiRightArrowAlt,
} from "react-icons/bi";
import {
  ArrowRightOutlined,
  PlusCircleOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

export default function Library() {
  return (
    <>
      <div>
        {/* header - library list */}
        <div className="flex flex-col gap-2">
          {/* header */}
          <div className="flex items-center justify-between">
            {/* left header */}
            <div className="flex items-center gap-2">
              <BiLibrary className="text-2xl" />
              <span>Thư viện</span>
            </div>
            {/* right header */}
            <div className="flex items-center gap-2">
              <button>
                <PlusCircleOutlined />
              </button>
              <button>
                <ArrowRightOutlined />
              </button>
            </div>
          </div>
          {/* library list */}
          <div>
            {/* header */}
            <div className="flex items-center justify-between">
              <button>
                <SearchOutlined />
              </button>
              <button className="text-lg flex gap-2 items-center">
                Gần đây
                <UnorderedListOutlined className="text-lg" />
              </button>
            </div>
            {/* list */}
            <div>
              <div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
