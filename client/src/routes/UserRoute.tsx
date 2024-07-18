import React from "react";
import Navigator from "../layouts/users/navigator/Navigator";
import Library from "../layouts/users/library-bar/Library";

export default function UserRoute() {
  return (
    <>
      <div className="w-full flex gap-2">
        {/* left container */}
        <div className="w-[26%] h-[calc(100vh-20px)] flex flex-col gap-2">
          {/* nav bar */}
          <div className="w-full h-[16%] bg-[#121212] rounded-xl p-2">
            <Navigator />
          </div>

          {/* library bar */}
          <div className="w-full h-[84%] bg-[#121212] rounded-xl p-2">
            <Library/>
          </div>
        </div>

        {/* right container */}
        <div className="w-[74%] h-[calc(100vh-20px)] bg-[#121212] rounded-xl">
          {/* header */}
          <div className="w-full h-[8%] rounded-tl-xl rounded-tr-xl bg-slate-400 p-2"></div>

          {/* outlet */}
          <div className="w-full h-[92%] rounded-bl-xl rounded-br-xl bg-slate-50 p-2"></div>
        </div>
      </div>
    </>
  );
}
