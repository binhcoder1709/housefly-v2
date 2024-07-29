import { NavLink, useLocation } from "react-router-dom";
import Logo from "../../../../assets/logos/housefly-admin.png";
import "./css/style.css";
import NProgress from "nprogress";
import { useEffect } from "react";

export default function Navigator() {
  const location = useLocation();
  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);
  return (
    <>
      <div className="flex flex-col items-center">
        <div>
          <img src={Logo} alt="" />
        </div>
        <nav className="navigator">
          <NavLink
            to={"/"}
            end
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to={"/music"}
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            Quản lí âm nhạc
          </NavLink>
          <NavLink
            to={"/account"}
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            Quản lí tài khoản
          </NavLink>
          <NavLink
            to={"/payment"}
            className={({ isActive }) =>
              isActive ? "active-link" : "inactive-link"
            }
          >
            Quản lí thanh toán
          </NavLink>
        </nav>
      </div>
    </>
  );
}
