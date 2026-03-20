export const getLoginData = (state) => state.loginReducer.login.data;
export const getLoginDataError = (state) => state.loginReducer.login.error;
export const getIsAuthenticated = (state) =>  state.loginReducer.login.isAuthenticated;