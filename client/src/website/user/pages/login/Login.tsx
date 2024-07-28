import {Button, Form, Input, Modal, notification} from "antd";
import {FC, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import baseUrl from "../../../../apis";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../../redux/store";
import {setTokens} from "../../../../redux/useSlice/tokenSlice.ts";


interface Props {
    button: React.ReactNode;
}

const Login: FC<Props> = (prop) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch<AppDispatch>()

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
        onSubmit: async (values, {resetForm}) => {
            const data =
                {
                    email: values.email,
                    password: values.password
                }
            try {
                const response = await baseUrl.post("/auth/login", data)
                if (response.status === 200) {
                    notification.success({message: "Đăng nhập thành công"})
                    dispatch(setTokens({refreshToken: response.data.RT, accessToken: response.data.AT}))
                    NProgress.start()
                    setIsModalOpen(false)
                    resetForm()
                    NProgress.done()
                }
            } catch (error) {
                notification.error({message: "Đăng nhập thất bại"})

            }
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
