import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./styles/fonts.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { NextUIProvider } from "@nextui-org/react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./store/index.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <NextUIProvider>
    <Auth0Provider
      domain="dev-pj5z374863on8vg8.us.auth0.com"
      clientId="Hu3SXvu6FO3kUyyfPhXoixjwTVxzypck"
      redirectUri={window.location.origin}
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <App />
            <ToastContainer />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </NextUIProvider>
  // </React.StrictMode>,
);
