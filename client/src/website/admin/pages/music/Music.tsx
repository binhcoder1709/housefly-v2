import { TabsProps } from "antd";
import React from "react";
import TabsItem from "../../../../components/tab/Tab";
import Song from "./items/song/Song";

export default function Music() {
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Bài hát",
      children: <Song/>,
    },
    {
      key: "2",
      label: "Playlist",
      children: "playlist",
    },
    {
      key: "3",
      label: "Nghệ sĩ",
      children: "nghệ sĩ",
    },
    {
      key: "4",
      label: "Album",
      children: "album",
      disabled: true,
    },
  ];
  return (
    <>
      <TabsItem cssClass="" items={tabItems} />
    </>
  );
}
