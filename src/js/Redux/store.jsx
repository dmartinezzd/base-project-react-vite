
import { configureStore } from "@reduxjs/toolkit";
import homeReducer from './Reducers/home';
import navBarReducer from './Reducers/navBar';
import helloWorldReducer from './Reducers/helloWorld';

export default configureStore({
  reducer: { homeReducer, navBarReducer, helloWorldReducer }
});
