import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  home: {
    data: null,
    error: null
  }
};

const homeReducer = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setHomeSuccess: (state, action) => {
      state.home.data = action.payload;
    },
    setHomeError: (state, action) => {
      state.home.error = action.payload;
    }
  }
});

export const { setHomeSuccess, setHomeError } = homeReducer.actions;

export default homeReducer.reducer;