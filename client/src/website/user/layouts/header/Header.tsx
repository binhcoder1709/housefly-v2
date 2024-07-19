import { BiSearch } from "react-icons/bi";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";

export default function Header() {
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
        {/* user function */}
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
      </div>
    </>
  );
}
