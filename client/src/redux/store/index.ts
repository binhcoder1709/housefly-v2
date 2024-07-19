import { configureStore } from "@reduxjs/toolkit";
import { TokenState } from "../useSlice/tokenSlice";

const store = configureStore({
  reducer: {},
});
export type RootState = {
  token: TokenState;
};
export type AppDispatch = typeof store.dispatch;
export default store;
