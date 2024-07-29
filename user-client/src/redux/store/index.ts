import { configureStore } from "@reduxjs/toolkit";
import tokenSlice, { TokenState } from "../useSlice/tokenSlice";
import musicRefSlice, { MusicRefSlice } from "../useSlice/musicRefSlice";

const store = configureStore({
  reducer: {
    token: tokenSlice,
    musicRef: musicRefSlice,
  },
});
export type RootState = {
  token: TokenState;
  musicRef: MusicRefSlice;
};
export type AppDispatch = typeof store.dispatch;
export default store;
