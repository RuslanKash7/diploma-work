import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "./store/createStore";
import { Provider } from "react-redux";
import AppLoader from "./components/ui/hoc/appLoader";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = createStore();

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <AppLoader>
          <App />
        </AppLoader>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>
);
