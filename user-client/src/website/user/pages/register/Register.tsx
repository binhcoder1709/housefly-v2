import { Button, Form, Input, Modal, notification } from "antd";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import baseUrl from "../../../../apis";
import {
  RegisterCredentials,
  registerService,
} from "../../../../services/auth.service";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";

interface Props {
  button: React.ReactNode;
}

interface FormValue {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Vui lòng nhập tên người dùng"),
  email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Vui lòng nhập email"),
  password: Yup.string()
    .min(6, "Mật khẩu phải có ít nhất 8 kí tự")
    .required("Vui lòng nhập mật khẩu"),
  confirmPassword: Yup.string()
    .nullable()
    .oneOf([Yup.ref("password")], "Mật khẩu không khớp")
    .required("Vui lòng nhập lại mật khẩu"),
});

const Register: FC<Props> = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerResult, setRegisterResult] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik<FormValue>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const data: RegisterCredentials = {
        user_name: values.username,
        email: values.email,
        password: values.password,
      };

      const resultAction = await dispatch(registerService(data));
      setRegisterResult(resultAction);
      if (registerService.fulfilled.match(resultAction)) {
        setIsModalOpen(false);
        resetForm();
      }
    },
  });

  useEffect(() => {
    if (registerResult) {
      if (registerService.fulfilled.match(registerResult)) {
        notification.success({ message: "Đăng ký thành công" });
      } else {
        if (registerResult.payload) {
          notification.error({ message: registerResult.payload as string });
        } else {
          notification.error({ message: "Có lỗi trong quá trình đăng ký" });
        }
      }
    }
  }, [registerResult]);

  return (
    <>
      <div onClick={showModal}>{prop.button}</div>
      <Modal
        open={isModalOpen}
        title="Đăng ký"
        footer={null}
        onCancel={handleCancel}
      >
        <Form layout="vertical" onFinish={formik.handleSubmit}>
          <Form.Item
            label="Tên người dùng"
            validateStatus={formik.errors.username ? "error" : undefined}
            help={formik.errors.username}
          >
            <Input
              name="username"
              placeholder="Nhập tên người dùng"
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
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
              placeholder="Nhập mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            validateStatus={formik.errors.confirmPassword ? "error" : undefined}
            help={formik.errors.confirmPassword}
          >
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="w-full" htmlType="submit">
              Đăng ký
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Register;
