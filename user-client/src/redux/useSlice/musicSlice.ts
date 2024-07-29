// import { createSlice } from "@reduxjs/toolkit";
// import { getAllMusicService } from "../../services/music.service";

// interface State {
//   data: MusicData[];
//   status: "idle" | "loading" | "failed" | "success";
//   error: string;
// }

export interface MusicData {
  song_id: string;
  song_name: string;
  song_path: string;
  song_duration: number;
}

// const initialState:State = {
//   data: [],
//   status: "idle",
//   error: "",
// }


// const musicSlice = createSlice({
//   name: "music",
//   initialState,
//   reducers:{},
//   extraReducers: (builder)=>
//   {
//     builder.addCase(getAllMusicService.pending, (state) => {
//       state.status = "loading";
//     }).addCase(getAllMusicService.fulfilled, (state, action))
//   }
// });
