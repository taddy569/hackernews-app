import { createAsyncThunk } from "@reduxjs/toolkit";

export const asyncRemoveTodo = createAsyncThunk(
  "todos/removeAsync",
  async (todo, thunkAPI) => {
    const result = await new Promise((resolve) => {
      setTimeout(() => {
        resolve(todo);
      }, 3000);
    });
    return result;
  }
);
