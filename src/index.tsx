import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { ThemeProvider } from "./context/ThemeContext";

import { store } from "./redux/store";
import App from "./App";
import "./sass/themes/_themes.scss";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider>
          <SnackbarProvider>
            <App />
          </SnackbarProvider>
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
