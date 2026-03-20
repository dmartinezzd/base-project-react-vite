import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  login: {
    data: null,
    error: null,
    isAuthenticated: false // 🔥 clave
  }
};

const loginReducer = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginSuccess: (state, action) => {
      state.login.data = action.payload;
      state.login.error = null;
      state.login.isAuthenticated = true; // ✅ login OK
    },
    setLoginError: (state, action) => {
      state.login.error = action.payload;
      state.login.isAuthenticated = false; // ❌ login fail
    },
    logout: (state) => {
      state.login.data = null;
      state.login.error = null;
      state.login.isAuthenticated = false; // 🔥 logout
    }
  }
});

export const { setLoginSuccess, setLoginError, logout } = loginReducer.actions;

export default loginReducer.reducer;