import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SidebarTeb({
  nonActiveIcon,
  title = "",
  activeIcon,
  route,
  setToggleSidebar,
}) {
  const [hover, setHover] = useState(false);

  return (
    <NavLink
      onClick={() => setToggleSidebar(false)}
      to={route}
      className="flex rounded-lg py-3 px-4 ml-[16px] mr-[16px] gap-4 cursor-pointer hover:bg-white hover:text-[#232550]"
      style={({ isActive }) => ({
        backgroundColor: isActive ? "white" : hover ? "white" : "transparent",
        color: isActive ? "black" : hover ? "#232550" : "#FFF",
      })}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {({ isActive }) => (
        <>
          <img
            src={hover || isActive ? activeIcon : nonActiveIcon}
            alt={title}
            className="w-6 h-6 shrink-0"
          />
          <span
            className={`font-[Raleway] text-base not-italic leading-6 ${
              isActive || hover ? "text-black" : "text-white"
            }`}
          >
            {title}
          </span>
        </>
      )}
    </NavLink>
  );
}
