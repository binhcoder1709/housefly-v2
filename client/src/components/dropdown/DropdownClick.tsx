import React, { FC } from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

interface Props {
  items: MenuProps["items"];
  clickBtn: React.ReactNode;
}

const DropdownClick: FC<Props> = (prop) => {
  return (
    <>
      <Dropdown className="cursor-pointer" menu={{ items: prop.items }} trigger={["click"]}>
        {prop.clickBtn}
      </Dropdown>
    </>
  );
};
export default DropdownClick;
