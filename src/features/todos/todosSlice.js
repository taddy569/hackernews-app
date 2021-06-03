import { createSlice } from "@reduxjs/toolkit";

import { asyncRemoveTodo } from "./todosAPI";

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
    isAsyncDelete: false, // undo like gmail
    isSelected: false,
  },
];

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
    [asyncRemoveTodo.fulfilled]: (state, action) => {
      return state.filter((item) => item.id !== action.payload.id);
    },
  },
});

const { actions, reducer } = todosSlice;

export const { add, update, updateMany, selectedAll } = actions;
export default reducer;
