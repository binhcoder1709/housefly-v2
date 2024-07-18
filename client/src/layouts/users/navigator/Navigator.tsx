import { BiHome, BiSearch } from "react-icons/bi";
import { NavLink } from "react-router-dom";

export default function Navigator() {
  return (
    <>
      <div className="p-3 flex flex-col gap-4">
        {/* home navlink */}
        <NavLink to={""} className={"flex items-center gap-2"}>
          <BiHome size={"30px"} fontWeight={"800"} className="text-gray-500"/>
          <span className="font-semibold text-lg">Trang chủ</span>
        </NavLink>

        {/* search navlink */}
        <NavLink to={""} className={"flex items-center gap-2"}>
          <BiSearch size={"30px"} fontWeight={"800"} className="text-gray-500"/>
          <span className="font-semibold text-lg">Tìm kiếm</span>
        </NavLink>
      </div>
    </>
  );
}
