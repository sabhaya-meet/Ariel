import React, { useEffect, useState } from "react";
import Main from "./components/Main";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import Login from "./autho/Login";
import Routes from "./Routes";
import { Spinner } from "@nextui-org/react";
import axios from "axios";
import { userActions } from "./store/userReducer";
import { useDispatch } from "react-redux";

function App() {
  const { isAuthenticated, getIdTokenClaims, isLoading } = useAuth0();
  const dispatch = useDispatch();

  const [appLoader, setAppLoader] = useState(true);
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      getIdTokenClaims()
        .then((response) => {
          const token = response?.__raw;

          localStorage.setItem("token", token);
          axios
            .get("https://api.trymarvin.com/api/v1/users/detail", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              dispatch(userActions.setProfile(response?.data));
            })
            .catch((error) => {
              console.log(error);
            });
          setAppLoader(false);
        })
        .catch((error) => {
          setAppLoader(false);
        });
    } else {
      setAppLoader(false);
    }
  }, [isAuthenticated]);

  if (isLoading || appLoader) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <div>
      {/* {isAuthenticated && <Main />} */}
      <Routes />
    </div>
  );
}

export default App;
