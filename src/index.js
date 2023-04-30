import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UsersContext } from "./context/usersContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UsersContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UsersContext>
);
