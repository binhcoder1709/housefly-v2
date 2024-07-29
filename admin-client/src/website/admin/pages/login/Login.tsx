import { Button, Form, Input, notification } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import baseUrl from "../../../../apis";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../redux/store";
import { setTokens } from "../../../../redux/useSlice/tokenSlice";

const Login = () => {
  const dispatch = useDispatch<AppDispatch>();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Email không hợp lệ!")
        .required("Vui lòng nhập email!"),
      password: Yup.string().required("Vui lòng nhập mật khẩu!"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await baseUrl.post("/auth/login", values);
        if (response.status === 200 && response.data.role === 2) {
          dispatch(
            setTokens({
              refreshToken: response.data.RT,
              accessToken: response.data.AT,
            })
          );
          window.location.href = "/";
        }
      } catch (error) {
        notification.error({ message: "Không có quyền đăng nhập" });
      }
    },
  });

  return (
    <>
      <div className="w-full h-screen flex justify-center items-center">
        <Form
          layout="vertical"
          className="bg-slate-400 p-2 rounded-lg"
          onFinish={formik.handleSubmit}
        >
          <h1 className="text-2xl text-center font-bold">
            Đăng nhập trang admin
          </h1>
          <Form.Item
            label="Email"
            validateStatus={
              formik.errors.email && formik.touched.email ? "error" : ""
            }
            help={
              formik.errors.email && formik.touched.email
                ? formik.errors.email
                : ""
            }
          >
            <Input
              name="email"
              placeholder="Nhập email"
              className="w-[300px]"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            validateStatus={
              formik.errors.password && formik.touched.password ? "error" : ""
            }
            help={
              formik.errors.password && formik.touched.password
                ? formik.errors.password
                : ""
            }
          >
            <Input.Password
              name="password"
              placeholder="Nhập mật khẩu"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Login;
