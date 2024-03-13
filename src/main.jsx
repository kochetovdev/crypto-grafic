import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app";
import { AppContextProvider } from "./app/Context/AppProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AppContextProvider>
);
