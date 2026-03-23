
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './Reducers/home';
import navBarReducer from './Reducers/navBar';
import loginReducer from './Reducers/login';


export default configureStore({
  reducer: { homeReducer, navBarReducer, loginReducer }
});
