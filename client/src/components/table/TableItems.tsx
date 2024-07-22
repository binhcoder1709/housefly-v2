import { Table } from "antd";
import { FC } from "react";

interface Props {
  column: object[];
  dataSources: object[];
}

const TableItems: FC<Props> = (prop) => {
  return <Table dataSource={prop.dataSources} columns={prop.column} />;
};
export default TableItems;
