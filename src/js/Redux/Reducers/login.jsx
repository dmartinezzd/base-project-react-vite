import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    data: null,
    error: null,
    isAuthenticated: false
  }
};

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.login.data = action.payload;
      state.login.error = null;
      state.login.isAuthenticated = true;
    },
    setLoginError: (state, action) => {
      state.login.error = action.payload;
      state.login.isAuthenticated = false; 
    },
    logout: (state) => {
      state.login.data = null;
      state.login.error = null;
      state.login.isAuthenticated = false; 
    }
  }
});

export const { setLoginSuccess, setLoginError, logout } = loginReducer.actions;

export default loginReducer.reducer;