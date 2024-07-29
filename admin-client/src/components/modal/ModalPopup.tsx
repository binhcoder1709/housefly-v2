import { Modal } from "antd";
import React, { FC, useState } from "react";

interface Props {
  button: React.ReactNode;
  handleOk: () => void;
  modalTitle: string;
  modalContent: React.ReactNode;
}

const ModalPopup: FC<Props> = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    prop.handleOk();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <>
        <div onClick={showModal}>{prop.button}</div>
        <Modal
          okText="Xác nhận"
          cancelText="Hủy"
          title={prop.modalTitle}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          {prop.modalContent}
        </Modal>
      </>
    </>
  );
};

export default ModalPopup;
