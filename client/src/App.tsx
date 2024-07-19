import { Route, Routes } from "react-router-dom";
import UserRoute from "./website/user/routes/UserRoute";
import Library from "./website/user/pages/library/Library";
import NotFoundPage from "./website/user/pages/notFoundPage/NotFoundPage";
import Music from "./website/user/pages/music/Music";
import Detail from "./website/user/pages/detail/Detail";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserRoute />}>
          <Route index element={<Music />} />
          <Route path="/library" element={<Library />} />
          <Route path="/artist" element={<Detail/>}/>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
