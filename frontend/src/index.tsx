import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ConfigProvider } from "antd";
import heIL from "antd/locale/he_IL";
import SortProvider from "./store/FiltersCtx";
import DataProvider from "./store/Data";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <DataProvider>
      <SortProvider>
        <App />
      </SortProvider>
    </DataProvider>
  </React.StrictMode>
);

//add <ConfigProvider locale={heIL}> for Internationalization config
