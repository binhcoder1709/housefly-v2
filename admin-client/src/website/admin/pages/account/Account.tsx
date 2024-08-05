import { Button, Input, message } from "antd";
import TableItems from "../../../../components/table/TableItems";
import { BiLockAlt, BiLockOpenAlt, BiTrash } from "react-icons/bi";
import { EyeOutlined } from "@ant-design/icons";
import baseUrl from "../../../../apis";
import { useEffect, useState } from "react";
import Statistical from "../../../../components/statistical/Statistical";

export default function Account() {
  const [accountData, setAccountData] = useState<Array<{user_id: string, user_name: string, email: string, status: number}>>([]);
  const [totalAccount, setTotalAccount] = useState<number>(0);
  const column = [
    {
      title: "#",
      render: (text: any, record: any, index: any) => index + 1,
    },
    {
      title: "Tên tài khoản",
      dataIndex: "user_name",
      key: "user_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Gói dịch vụ",
      // dataIndex: "role",
      // key: "role",
    },
    {
      title: "Trạng thái",
      render: (text: any, record: any) => (
        <>
          <span>{record.status == 1 ? "Đang hoạt động" : "Bị khóa"}</span>
        </>
      ),
    },
    {
      title: "Chức năng",
      render: (text: any, record: any) => (
        <>
          <div className="flex items-center gap-2">
            <Button
              onClick={() =>
                handleChangeStatusUser(record.user_id, record.status)
              }
            >
              {record.status == 1 ? <BiLockAlt /> : <BiLockOpenAlt />}
            </Button>
            <Button>
              <EyeOutlined />
            </Button>
            <Button danger onClick={() => handleDeleteUser(record.user_id)}>
              <BiTrash />
            </Button>
          </div>
        </>
      ),
    },
  ];

  //   fetch users data
  const fetchUsersData = async () => {
    try {
      const response = await baseUrl.get("/users?page=1&limit=2");
      if (response.status === 200) {
        setAccountData(response.data.dataLimit);
        setTotalAccount(response.data.totalUsers);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //   handler change status user
  const handleChangeStatusUser = async (user_id: string, status: number) => {
    try {
      let statusUpdate = null;
      if (status == 1) {
        statusUpdate = 0;
      } else {
        statusUpdate = 1;
      }
      const response = await baseUrl.put(
        `/users/status?user_id=${user_id}&status=${statusUpdate}`
      );
      if (response.status === 200) {
        message.success("Thay đổi trạng thái thành công");
        fetchUsersData();
      }
    } catch (error) {
      message.error("Thay đổi trạng thái thất bại");
    }
  };

  //   handle delete user
  const handleDeleteUser = async (user_id: string) => {
    try {
      const response = await baseUrl.delete(`/users/${user_id}`);
      if (response.status === 200) {
        message.success("Xóa người dùng thành công");
        fetchUsersData();
      }
    } catch (error) {
      message.error("Xóa người dùng thất bại");
    }
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-2">
        <div>
          <Statistical
            title_1="Tổng số tài khoản"
            title_2="Tài khoản đang hoạt động"
            title_3="Tài khoản bị khóa"
            content_1={totalAccount}
            content_2={"2"}
            content_3={"2"}
          />
        </div>
        <div className="flex justify-end">
          <Input className="w-[20%]" placeholder="Tìm kiếm tài khoản" />
        </div>
        <div>
          <TableItems column={column} dataSources={accountData} totalPage={1} />
        </div>
      </div>
    </>
  );
}
