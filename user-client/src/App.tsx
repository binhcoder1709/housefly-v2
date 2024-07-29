import { Route, Routes } from "react-router-dom";
import UserRoute from "./website/user/routes/UserRoute";
import Library from "./website/user/pages/library/Library";
import NotFoundPage from "./website/user/pages/notFoundPage/NotFoundPage";
import Music from "./website/user/pages/music/Music";
import ArtistDetail from "./website/user/pages/detail/ArtistDetail";
import SongDetail from "./website/user/pages/detail/SongDetail";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<UserRoute />}>
          <Route index element={<Music />} />
          <Route path="/library" element={<Library />} />
          <Route path="/artist" element={<ArtistDetail />} />
          <Route path="/song/:id" element={<SongDetail />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
