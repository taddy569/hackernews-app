import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { asyncRemoveTodoAPI } from "./todosAPI";

const initialState = [
  {
    id: 123456789, //should always being a number
    title: "buy something in supermarket...",
    content: "an egg, 2 oranges, 1.5l milk, 2 packs of pancake, ...",
    label: "0f0",
    createdAt: "unix time stamp...",
    isImportant: true,
    isComplete: false,
    isRemove: false,
    isAsyncRemove: false, // undo like gmail
    isSelected: false,
  },
];

export const removeTodoAsync = createAsyncThunk(
  "hackerNews/removeAsync",
  async (value) => {
    const res = await asyncRemoveTodoAPI(value);
    return res.data;
  }
);

const todosSlice = createSlice({
  name: "hackerNews",
  initialState,
  reducers: {
    add: (state, action) => [...state, action.payload],
    update: (state, action) => {
      return state.map((item) => {
        if (item.id === action.payload.id) {
          item = {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    },
    updateMany: (state, action) => {
      return state.map((item) => {
        if (item.isSelected === true) {
          item = {
            ...item,
            ...action.payload,
          };
        }
        return item;
      });
    },
    selectedAll: (state, action) => {
      return state.map((item) => ({
        ...item,
        isSelected: action.payload.checked,
      }));
    },
  },
  extraReducers: {
    [removeTodoAsync.pending]: (state, action) => {},
    [removeTodoAsync.fulfilled]: (state, action) => {
      state = state.map((item) => {
        if (item.isSelected === true) {
          item.isAsyncRemove = true;
        }
        return item;
      });
    },
    [removeTodoAsync.rejected]: (state, action) => {},
  },
});

const { actions, reducer } = todosSlice;

export const { add, update, updateMany, selectedAll } = actions;
export default reducer;
