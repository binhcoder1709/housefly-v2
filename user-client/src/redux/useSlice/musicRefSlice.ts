import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MusicRefSlice {
  songId: string | null;
  songName: string | null;
  songPath: string | null;
  songImage: string | null;
  artists: Artist[];
  isPlay: boolean;
}

const initialState: MusicRefSlice = {
  songId: "",
  songName: "",
  songPath: "",
  songImage: "",
  artists: [],
  isPlay: false,
}

interface Artist {
  artist_id: string;
  artist_name: string;
}
const musicRef = createSlice({
  name: "musicRef",
  initialState,
  reducers: {
    setSongData: (
      state,
      action: PayloadAction<{
        songId: string;
        songName: string;
        songPath: string;
        songImage: string;
        artists: Artist[]
      }>
    ) => {
      state.songId = action.payload.songId;
      state.songName = action.payload.songName;
      state.songImage = action.payload.songImage;
      state.songPath = action.payload.songPath;
      state.artists = action.payload.artists;
      state.isPlay = true;
    },
    setPlaybarState: (state, action: PayloadAction<boolean>) => {
      state.isPlay = action.payload;
    },
  },
});

export const { setSongData, setPlaybarState } = musicRef.actions;
export default musicRef.reducer;
