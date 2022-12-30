import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.push(action.payload);
    },
    deleteAllUser: (state, action) => {
      return [];
    },

    deleteUser: (state, action) => {
      const { id } = action.payload;
      const existingUser = state.find((user) => user.id === id);
      if (existingUser) {
        return state.filter((user) => user.id !== id);
      }
    },
    isSelect: (state, action) => {
      const { id } = action.payload;
      const getState = state;
      const isAvailavble = state.filter((user) => user.id === id);
      debugger;
      if (isAvailavble) {
        let check = isAvailavble[0].isSelected ? false : true;
        return void getState.map((val) => {
          if (val.id === id) {
            val.isSelected = check;
          }
        });
      }
    },
  },
});

export const { addUser, deleteUser, deleteAllUser, isSelect } =
  userSlice.actions;
export default userSlice.reducer;
