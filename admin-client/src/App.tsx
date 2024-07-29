import { Route, Routes } from "react-router-dom";
import AdminRoute from "./website/admin/routes/AdminRoute";
import Music from "./website/admin/pages/music/Music";
import Account from "./website/admin/pages/account/Account";
import Login from "./website/admin/pages/login/Login";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AdminRoute />}>
          <Route path="/music" element={<Music />} />
          <Route path="/account" element={<Account />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}
