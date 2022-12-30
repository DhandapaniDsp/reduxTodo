import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "react";
import usersReducer from "./components/redux/userSlice";

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
