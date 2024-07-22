import { TabsProps } from "antd";
import React from "react";
import TabsItem from "../../../../components/tab/Tab";

export default function Music() {
  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Bài hát",
      children: "bài hát",
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
    },
  ];
  return (
    <>
      <TabsItem cssClass="" items={tabItems} />
    </>
  );
}
