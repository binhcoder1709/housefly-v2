import {Button, Form, Input, Modal, notification} from "antd";
import {FC, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import baseUrl from "../../../../apis";

interface Props {
    button: React.ReactNode;
}

const Register: FC<Props> = (prop) => {
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
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
        validationSchema: Yup.object({
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
        }),
        onSubmit: async (values, {resetForm}) => {
            const data = {
                user_name: values.username,
                email: values.email,
                password: values.password
            }

            try {
                const response = await baseUrl.post("/auth/register", data)
                if (response.status === 201) {
                    notification.success({message: "Đăng kí thành công"})
                    setIsModalOpen(false)
                    resetForm()
                }
            } catch (error) {
                console.log(error)
                notification.error({message: "Đăng ký thất bại"})
            }
        },
    });

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
