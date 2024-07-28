import { Button, Form, Input, message, Modal, Select, Space } from "antd";
import React, { FC, useEffect, useState } from "react";
import UploadSingleFile from "../../../../../../../components/upload/UploadSingleFile";
import * as Yup from "yup";
import { useFormik } from "formik";
import { BiPlus } from "react-icons/bi";
import baseUrl from "../../../../../../../apis";

interface Props {
  button: React.ReactNode;
  fetchData: () => void;
}

interface Artist {
  artist_name: string;
  artist_id: string;
}

interface Genre {
  genre_name: string;
  genre_id: string;
}

const AddSongForm: FC<Props> = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [musicUrl, setMusicUrl] = useState<string>("");
  const [musicDuration, setMusicDuration] = useState<number>();
  const [artists, setArtists] = useState<Artist[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  // show modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  // api call artists
  const fetchArtists = async () => {
    try {
      const response = await baseUrl.get("/artists");
      setArtists(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // api call genres
  const fetchGenres = async () => {
    try {
      const response = await baseUrl.get("/genres");
      setGenres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchArtists();
    fetchGenres();
  }, []);

  // handle change artist
  const handleArtistChange = (e: string[]) => {
    setSelectedArtists(e);
  };

  // handle genre change
  const handleGenreChange = (e: string) => {
    setSelectedGenre(e);
  };

  // handler song duration
  const handleSongDuration = () => {
    const audio = new Audio(musicUrl);
    audio.onloadedmetadata = () => {
      setMusicDuration(audio.duration);
    };
  };

  useEffect(() => {
    handleSongDuration();
  }, [musicUrl]);

  const formik = useFormik({
    initialValues: {
      songName: "",
    },
    validationSchema: Yup.object({
      songName: Yup.string().required("Vui lòng nhập tên bai hat"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const data = {
        song_name: values.songName,
        song_path: musicUrl,
        song_image:
          "https://images2.thanhnien.vn/528068263637045248/2023/4/25/thai-hoang-55-16824107753271544271289.jpeg",
        song_duration: musicDuration,
        genre: selectedGenre,
        artist: selectedArtists,
      };
      
      try {
        const response = await baseUrl.post("/songs/create", data);
        if (response.status === 201) {
          message.success("Thêm bài hát thành công");
          setIsModalOpen(false);
          resetForm();
          setMusicUrl("");
          setSelectedArtists([]);
          setSelectedGenre("");
          prop.fetchData();
        }
      } catch (error) {
        console.log(error);

        message.error("Thêm bài hát thất bại");
      }
    },
  });

  const isFormValid = () =>
    formik.isValid && musicUrl && selectedArtists.length > 0 && selectedGenre;

  return (
    <>
      <div onClick={showModal}>{prop.button}</div>
      <Modal
        footer={null}
        title="Thêm bài hát"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
      >
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Tên bài hát"
            validateStatus={
              formik.touched.songName && formik.errors.songName ? "error" : ""
            }
            help={formik.touched.songName && formik.errors.songName}
          >
            <Input
              placeholder="Nhập tên bài hát"
              name="songName"
              value={formik.values.songName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item label="Tải file">
            <UploadSingleFile setUrl={setMusicUrl} />
          </Form.Item>
          <Form.Item label="Nghệ sĩ">
            <div className="flex gap-1">
              <Space style={{ width: "100%" }} direction="vertical">
                <Select
                  mode="multiple"
                  onChange={handleArtistChange}
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Vui lòng chọn nghệ sĩ"
                  options={artists.map((artist) => ({
                    label: artist.artist_name,
                    value: artist.artist_id,
                  }))}
                  value={selectedArtists}
                />
              </Space>
              <Button>
                <BiPlus />
              </Button>
            </div>
          </Form.Item>
          <Form.Item label="Thể loại">
            <div className="flex gap-1">
              <Select
                onChange={handleGenreChange}
                showSearch
                placeholder="Vui lòng chọn thể loại"
                optionFilterProp="label"
                options={genres.map((genre) => ({
                  label: genre.genre_name,
                  value: genre.genre_id,
                }))}
                value={selectedGenre}
              />
              <Button>
                <BiPlus />
              </Button>
            </div>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              className="w-full"
              htmlType="submit"
              disabled={!isFormValid()}
            >
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddSongForm;
