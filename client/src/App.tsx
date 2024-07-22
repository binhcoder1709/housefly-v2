import { Route, Routes } from "react-router-dom";
import UserRoute from "./website/user/routes/UserRoute";
import Library from "./website/user/pages/library/Library";
import NotFoundPage from "./website/user/pages/notFoundPage/NotFoundPage";
import Music from "./website/user/pages/music/Music";
import MusicAdmin from "./website/admin/pages/music/Music";
import Detail from "./website/user/pages/detail/Detail";
import Login from "./website/admin/pages/login/Login";
import AdminRoute from "./website/admin/routes/AdminRoute";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserRoute />}>
          <Route index element={<Music />} />
          <Route path="/library" element={<Library />} />
          <Route path="/artist" element={<Detail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="/admin" element={<AdminRoute />}>
          <Route path="/admin/music" element={<MusicAdmin />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}
