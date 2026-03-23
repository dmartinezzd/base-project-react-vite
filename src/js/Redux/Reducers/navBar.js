import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  navBar: {
    data: null,
    error: null
  }
};

const navBarReducer = createSlice({
  name: 'navBar',
  initialState,
  reducers: {
    setNavBarSuccess: (state, action) => {
      state.navBar.data = action.payload;
    }
  }
});

export const { setNavBarSuccess } = navBarReducer.actions;

export default navBarReducer.reducer;