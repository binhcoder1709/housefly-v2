import { Button, Form, Input, Modal } from "antd";
import { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';


interface Props {
  button: React.ReactNode;
}

const Login: FC<Props> = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không đúng định dạng")
        .required("Vui lòng nhập email"),
      password: Yup.string().required("Vui lòng nhập mật khẩu"),
    }),
    onSubmit: async (values, { resetForm }) => {
      NProgress.start();
      console.log(values);
      resetForm();
      handleOk();
      NProgress.done();
    },
  });

  return (
    <>
      <div onClick={showModal}>{prop.button}</div>
      <Modal
        open={isModalOpen}
        title="Đăng nhập"
        footer={null} // Ẩn nút Cancel và OK
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Email"
              validateStatus={formik.errors.email ? "error" : undefined}
              help={formik.errors.email}
          >
            <Input
              name="email"
              placeholder="Nhập email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            validateStatus={formik.errors.password ? "error" : undefined}
            help={formik.errors.password}
          >
            <Input
              type="password"
              name="password"
              placeholder="********"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item>
            <Button className="w-full" type="primary" htmlType="submit">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Login;
