import { Button, Form, Input, Modal, notification } from "antd";
import { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { setTokens } from "../../../../redux/useSlice/tokenSlice.ts";
import {
  LoginCredentials,
  loginService,
} from "../../../../services/auth.service.ts";

interface Props {
  button: React.ReactNode;
}

interface FormValue {
  email: string;
  password: string;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email không đúng định dạng")
    .required("Vui lòng nhập email"),
  password: Yup.string().required("Vui lòng nhập mật khẩu"),
});

const Login: FC<Props> = (prop) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginResult, setLoginResult] = useState<any>(null);
  const dispatch = useDispatch<AppDispatch>();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik<FormValue>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,

    // submit event to login
    onSubmit: async (values, { resetForm }) => {
      const data: LoginCredentials = {
        email: values.email,
        password: values.password,
      };

      //   check login state
      const resultAction = await dispatch(loginService(data));      
      setLoginResult(resultAction);
      if (loginService.fulfilled.match(resultAction)) {
        dispatch(
          setTokens({
            accessToken: resultAction.payload.AT,
            refreshToken: resultAction.payload.RT,
          })
        );
        setIsModalOpen(false);
        resetForm();
        window.location.href = "/";
      }
    },
  });

  //   if login success, effect will be triggered
  useEffect(() => {
    if (loginResult) {
      if (loginService.fulfilled.match(loginResult)) {
        notification.success({ message: "Đăng nhập thành công" });
      } else {
        if (loginResult.payload) {
          notification.error({
            message: loginResult.payload as string,
          });
        } else {
          notification.error({
            message: "Có lỗi xảy ra trong quá trình đăng nhập",
          });
        }
      }
    }
  }, [loginResult]);

  return (
    <>
      <div onClick={showModal}>{prop.button}</div>
      <Modal
        open={isModalOpen}
        title="Đăng nhập"
        footer={null}
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
