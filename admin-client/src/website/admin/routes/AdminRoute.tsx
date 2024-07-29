import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navigator from "../layouts/navigator/Navigator";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import baseUrl from "../../../apis";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import Header from "../layouts/header/Header";

interface IPayload {
  user_id: string;
}

export default function AdminRoute() {
  const [role, setRole] = useState<number | null>(null);
  const navigate = useNavigate();
  console.log(role);

  const token = useSelector((state: RootState) => state.token.accessToken);
  if (!token) {
    return <Navigate to="/login" />;
  }
  const payload = jwtDecode<IPayload>(token);
  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await baseUrl.get(`/users/${payload.user_id}`);
        setRole(response.data.role);
        if (response.data.role !== 2) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRole();
  }, []);
  return (
    <>
      <div className="flex">
        {/* nav bar */}
        <div className="w-[20%] h-screen overflow-x-auto bg-slate-200">
          <Navigator />
        </div>
        {/* content */}
        <div className="w-[80%] h-screen ">
          {/* header */}
          <div className="w-full h-[50px] bg-slate-400"><Header/></div>
          {/* main */}
          <div className="w-full h-[calc(100%-50px)] p-2 overflow-x-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
