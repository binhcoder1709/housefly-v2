import { Outlet } from "react-router-dom";
import Header from "../layouts/header/Header";
import Navigator from "../layouts/navigator/Navigator";
import Playbar from "../layouts/playbar/Playbar";
import '../css/index.css'

export default function UserRoute() {
  return (
    <>
      <div>
        {/* top container */}
        <div className="w-full h-[calc(100vh-88px)] flex">
          {/* nav bar */}
          <div className="w-[20%] h-full bg-[#02004F]">
            <Navigator />
          </div>
          {/* content */}
          <div className="w-[80%] h-full bg-[#020030]">
            {/* header */}
            <div className="w-full h-[90px] bg-black">
              <Header/>
            </div>
            {/* main */}
            <div className="w-full h-[calc(100%-90px)] overflow-x-auto">
              <Outlet/>
            </div>
          </div>
        </div>
        {/* bottom container */}
        <div className="w-full">
          <Playbar/>
        </div>
      </div>
    </>
  );
}
