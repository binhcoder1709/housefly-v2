import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, message, Upload } from "antd";

interface Props {
  setUrl: any;
}

const UploadSingleFile: React.FC<Props> = (prop) => {
  const props: UploadProps = {
    name: "file",
    action: `${import.meta.env.VITE_BASEURL}/upload/music`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        prop.setUrl(info.file.response.url);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} tải lên thành công`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} tải lên thất bại`);
      }
    },
  };
  return (
    <>
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Nhấn để tải lên</Button>
      </Upload>
    </>
  );
};

export default UploadSingleFile;
