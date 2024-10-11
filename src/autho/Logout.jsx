import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LogoutIcon from "../assets/logout.svg";
function Logout() {
  const { logout } = useAuth0();
  return (
    <img
      src={LogoutIcon}
      className="flex p-2 justify-center items-center  gap-2 cursor-pointer"
      onClick={() => logout({ returnTo: window.location.origin })}
    />
  );
}

export default Logout;
