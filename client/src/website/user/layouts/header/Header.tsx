import {BiCog, BiLogOut, BiSearch, BiUser} from "react-icons/bi";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import {Avatar} from "antd";
import type {MenuProps} from "antd";
import {AntDesignOutlined} from "@ant-design/icons";
import DropdownClick from "../../../../components/dropdown/DropdownClick";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../../redux/store";

export default function Header() {
    const [isLogin, setIsLogin] = useState<boolean>(false)

    const userDropdownItems: MenuProps["items"] = [
        {
            label: (
                <Link to={"#"} className="flex items-center gap-2">
                    <BiUser/>
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
                    <BiCog/>
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
                <button className="flex items-center gap-2">
                    <BiLogOut/>
                    Đăng xuất
                </button>
            ),
            danger: true,
            key: "4",
        },
    ];

    const accessToken = useSelector<RootState>(state => state.token.accessToken);
    const refreshToken = useSelector<RootState>(state => state.token.refreshToken);
    useEffect(() => {
        if (!accessToken && !refreshToken) {
            setIsLogin(false)
        }
        else
        {
            setIsLogin(true)
        }
    }, []);
    return (
        <>
            <div className="justify-between px-6 h-full flex items-center">
                {/* search input */}
                <div className="flex">
                    <button
                        type="button"
                        className="text-white bg-[#020030] p-[15px] rounded-l-3xl"
                    >
                        <BiSearch fontSize={25}/>
                    </button>
                    <input
                        type="text"
                        id="searchInput"
                        className="w-[500px] p-[15px] outline-none rounded-r-3xl pr-5 bg-[#020030] text-white"
                        placeholder="Tìm kiếm bài hát, album, DJ yêu thích"
                    />
                </div>
                {/*user function*/}
                {isLogin == false ? (<>
                    <div className="flex gap-2">
                        <Register
                            button={
                                <>
                                    <button
                                        className="text-[#00ff00] border-[#00ff00] border-2 p-[7px] bg-black hover:bg-[#00ff00] transition hover:text-black rounded-3xl">
                                        Đăng ký
                                    </button>
                                </>
                            }
                        />
                        <Login
                            button={
                                <>
                                    {" "}
                                    <button
                                        className="text-[#02004f] p-[7px] bg-[#00ff00] rounded-3xl hover:bg-[#02004f] hover:text-[#00ff00] transition">
                                        Đăng nhập
                                    </button>
                                </>
                            }
                        />
                    </div>
                </>) : (<>
                    <DropdownClick
                        clickBtn={<Avatar className="bg-gray-400">U</Avatar>}
                        items={userDropdownItems}
                    /></>)}
            </div>
        </>
    );
}
