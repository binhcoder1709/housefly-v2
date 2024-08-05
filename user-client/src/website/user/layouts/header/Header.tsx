import { BiCog, BiLogOut, BiSearch, BiUser } from "react-icons/bi";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import { Avatar } from "antd";
import type { MenuProps } from "antd";
import DropdownClick from "../../../../components/dropdown/DropdownClick";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { removeTokens } from "../../../../redux/useSlice/tokenSlice";
import { authApi } from "../../../../apis";
import { jwtDecode } from "jwt-decode";

export default function Header() {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.token);

  // handle logout
  const handleLogout = async () => {
    try {
      const payloadToken = jwtDecode<{ user_id: string }>(
        token.accessToken || ""
      );
      await authApi.post(`/logout/${payloadToken.user_id}`, {
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
      dispatch(removeTokens());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token.accessToken !== null && token.refreshToken !== null) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [token]);

  // Dropdown
  const userDropdownItems: MenuProps["items"] = [
    {
      label: (
        <Link to={"#"} className="flex items-center gap-2">
          <BiUser />
          Thông tin cá nhân
        </Link>
      ),
      key: "0",
    },
    {
      label: <Link to={"#"}>Nâng cấp VIP</Link>,
      key: "1",
    },
    {
      label: (
        <Link to={"#"} className="flex items-center gap-2">
          <BiCog />
          Cài đặt
        </Link>
      ),
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: (
        <button className="flex items-center gap-2" onClick={handleLogout}>
          <BiLogOut />
          Đăng xuất
        </button>
      ),
      danger: true,
      key: "4",
    },
  ];
  return (
    <>
      <div className="justify-between px-6 h-full flex items-center">
        {/* search input */}
        <div className="flex">
          <button
            type="button"
            className="text-white bg-[#020030] p-[15px] rounded-l-3xl"
          >
            <BiSearch fontSize={25} />
          </button>
          <input
            type="text"
            id="searchInput"
            className="w-[500px] p-[15px] outline-none rounded-r-3xl pr-5 bg-[#020030] text-white"
            placeholder="Tìm kiếm bài hát, album, DJ yêu thích"
          />
        </div>
        {/*user function*/}
        {isLogin == false ? (
          <>
            <div className="flex gap-2">
              <Register
                button={
                  <>
                    <button className="text-[#00ff00] border-[#00ff00] border-2 p-[7px] bg-black hover:bg-[#00ff00] transition hover:text-black rounded-3xl">
                      Đăng ký
                    </button>
                  </>
                }
              />
              <Login
                button={
                  <>
                    {" "}
                    <button className="text-[#02004f] p-[7px] bg-[#00ff00] rounded-3xl hover:bg-[#02004f] hover:text-[#00ff00] transition">
                      Đăng nhập
                    </button>
                  </>
                }
              />
            </div>
          </>
        ) : (
          <>
            <DropdownClick
              clickBtn={
                <Avatar
                  className="bg-gray-400"
                  src="https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
                />
              }
              items={userDropdownItems}
            />
          </>
        )}
      </div>
    </>
  );
}
