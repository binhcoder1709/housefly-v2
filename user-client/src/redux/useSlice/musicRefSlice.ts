import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MusicRefSlice {
  songName: string | null;
  songPath: string | null;
}

const musicRef = createSlice({
  name: "musicRef",
  initialState: {
    songName: "",
    songPath: "",
  },
  reducers: {
    setSongData: (
      state,
      action: PayloadAction<{ songName: string; songPath: string }>
    ) => {
      state.songName = action.payload.songName;
      state.songPath = action.payload.songPath;
    },
  },
});

export const { setSongData } = musicRef.actions;
export default musicRef.reducer;
