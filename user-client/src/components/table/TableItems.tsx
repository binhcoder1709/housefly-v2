import { Table } from "antd";
import { FC, useState } from "react";

interface Props {
  column: object[];
  dataSources: object[];
  totalPage: number
}

const TableItems: FC<Props> = (prop) => {
  const [current, setCurrent] = useState(1); // Trạng thái cho trang hiện tại
  const [pageSize, setPageSize] = useState(10); // Trạng thái cho số mục trên mỗi trang

  const handleTableChange = (pagination:any) => {
    setCurrent(pagination.current);
    setPageSize(pagination.pageSize);
  };
  return (
    <Table
      dataSource={prop.dataSources}
      columns={prop.column}
      pagination={{
        current,
        pageSize,
        total: prop.totalPage, // Tổng số mục
        showSizeChanger: true, // Hiển thị tùy chọn thay đổi số mục trên mỗi trang
        pageSizeOptions: ['10', '20', '50', '100'], // Các tùy chọn số mục trên mỗi trang
      }}
      onChange={handleTableChange}

    />
  );
};
export default TableItems;
