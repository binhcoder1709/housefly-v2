import { Outlet } from "react-router-dom";
import Navigator from "../layouts/navigator/Navigator";


export default function AdminRoute() {
  return (
    <>
      <div className="flex">
        {/* nav bar */}
        <div className="w-[20%] h-screen overflow-x-auto bg-slate-200">
            <Navigator/>
        </div>
        {/* content */}
        <div className="w-[80%] h-screen ">
          {/* header */}
          <div className="w-full h-[70px] bg-black"></div>
          {/* main */}
          <div className="w-full h-[calc(100%-70px)] p-2 overflow-x-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
