import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/css/index.scss";
import { Provider } from "react-redux";
import { setupStore } from "./lib/store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const store = setupStore();

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
