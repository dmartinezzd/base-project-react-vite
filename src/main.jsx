import React from "react";
import { createRoot } from "react-dom/client";
import Routes from "./js/Routes/Routes";
//redux init
import { Provider } from 'react-redux';
import store from './js/Redux/store';
//bootstrap
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}

createRoot(document.getElementById("root")).render(<App />);