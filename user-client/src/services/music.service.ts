import { createAsyncThunk } from "@reduxjs/toolkit";
import { musicApi } from "../apis";

export const getAllMusicService = createAsyncThunk("music/getAllMusic", async () => {
  try {
    const response = await musicApi.get("/");
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
