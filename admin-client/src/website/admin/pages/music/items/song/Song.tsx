import React, { useEffect, useState } from "react";
import TableItems from "../../../../../../components/table/TableItems";
import { Button } from "antd";
import { BiPen, BiPencil, BiPlus, BiTrash } from "react-icons/bi";
import AddSongForm from "./song_items/AddSongForm";
import baseUrl from "../../../../../../apis";
import Statistical from "../../../../../../components/statistical/Statistical";

export default function Song() {
  const [songData, setSongData] = useState<[]>([]);
  const [totalSongs, setTotalSongs] = useState<number>(0);
  const [page, setPage] = useState<number>(NaN);

  const column = [
    {
      title: "#",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Tên bài hát",
      dataIndex: "song_name",
      key: "song_name",
    },
    {
      title: "Thể loại",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Nghệ sĩ",
      dataIndex: "artist",
      key: "artist",
    },
    {
      title: "Chức năng",
      render: (text: any, record: any) => (
        <>
          <div className="flex gap-2">
            {/* <AddSongForm
              button={
                <>
                  {" "}
                  <Button>
                    <BiPencil />
                  </Button>
                </>
              }
            /> */}
            <Button danger onClick={() => handleDeleteSong(record.song_id)}>
              <BiTrash />
            </Button>
          </div>
        </>
      ),
    },
  ];

  // handler delete song
  const handleDeleteSong = async (song_id: string) => {
    try {
      const response = await baseUrl.delete(`/songs/${song_id}`);
      if (response.status === 200) {
        fetchSongsData();
      }
    } catch (error) {
      console.error(error);
    }
  };

  // fetch songs data
  const fetchSongsData = async () => {
    try {
      const response = await baseUrl.get("/songs?page=1&limit=2");
      if (response.status === 200) {
        setSongData(response.data.dataLimit);
        setPage(response.data.totalPage);
        setTotalSongs(response.data.totalSongs);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSongsData();
  }, []);
  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <Statistical
            title_1="Tổng bài hát"
            title_2="Nghe nhiều nhất"
            title_3="Nhiều lượt thích nhất"
            content_1={totalSongs}
            content_2={"2"}
            content_3={"2"}
          />
        </div>
        <div className="flex justify-end">
          <AddSongForm
            button={
              <>
                <Button type="primary">
                  <BiPlus />
                  Thêm bài hát
                </Button>
              </>
            }
            fetchData={fetchSongsData}
          />
        </div>
        <div>
          <TableItems column={column} dataSources={songData} totalPage={page} />
        </div>
      </div>
    </>
  );
}
