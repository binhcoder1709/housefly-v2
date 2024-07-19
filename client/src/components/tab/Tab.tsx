import { Tabs, TabsProps } from "antd";
import { FC } from "react";

interface Props {
  items: TabsProps["items"];
  cssClass:string
}

const TabsItem: FC<Props> = (prop) => {
  return (
    <>
      <Tabs  defaultActiveKey="1" items={prop.items} className={prop.cssClass}/>
    </>
  );
};
export default TabsItem;
