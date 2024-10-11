import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ArialLogo from "../assets/logo.svg";
import ToggleIcon from "../assets/toggleIcon.svg";
import CloseIcon from "../assets/CloseIcon.svg";

function Main() {
  const [toggleSidebar, setToggleSidebar] = useState(false);

  const isMobile = useMediaQuery({
    query: "(max-width: 992px)",
  });

  const sideabrToggle = () => {
    setToggleSidebar(!toggleSidebar);
  };

  return (
    <>
      <div className="h-screen flex bg-[#232550]">
        {(!isMobile || toggleSidebar) && (
          <Sidebar setToggleSidebar={setToggleSidebar} />
        )}
        <main
          className={`${
            isMobile ? "w-full absolute h-full" : "w-[calc(100%-312px)] "
          } overflow-y-auto `}
        >
          {isMobile && !toggleSidebar && (
            <div className="h-16 bg-[#5151A6] w-full">
              <div className="flex justify-between">
                <img className="mt-3 ml-3" src={ArialLogo} alt="" />

                {!toggleSidebar && (
                  <img
                    src={ToggleIcon}
                    className="mt-3.5 mr-3 cursor-pointer"
                    alt=""
                    onClick={sideabrToggle}
                  />
                )}
              </div>
            </div>
          )}
          {toggleSidebar && (
            <img
              src={CloseIcon}
              className="mt-4 mr-3 ml-auto h-7 cursor-pointer"
              alt=""
              onClick={sideabrToggle}
            />
          )}
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Main;
