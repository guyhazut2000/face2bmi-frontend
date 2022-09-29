import { createSlice } from "@reduxjs/toolkit";

const resultRedux = createSlice({
  name: "result",
  initialState: {
    data: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    getResultStart: (state) => {
      state.isFetching = true;
    },
    getResultSuccess: (state, action) => {
      state.data = action.payload;
      state.isFetching = false;
      state.error = false;
    },
    getResultFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },

    resetResult: (state) => {
      state.data = null;
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  getResultStart,
  getResultSuccess,
  getResultFailure,
  resetResult,
} = resultRedux.actions;
export default resultRedux.reducer;
