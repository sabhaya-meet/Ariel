import React, { useState } from "react";
import logo from "../assets/logo.svg";
import rfpsLogo from "../assets/RFPS.svg";
import activeRfpsLogo from "../assets/activeRFPS.svg";
import myTeamLogo from "../assets/MyTeam.svg";
import activeMyTeamLogo from "../assets/activeMyTeam.svg";
import reportLogo from "../assets/Report.svg";
import activeReport from "../assets/activeReport.svg";
import supportLogo from "../assets/Support.svg";
import activeSupport from "../assets/activeSupport.svg";
import SettingLogo from "../assets/SettingLogo.svg";
import activeSettingLogo from "../assets/activeSettingLogo.svg";
import Logout from "../autho/Logout";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../customCss/sidebar.css";
import SidebarTeb from "./SidebarTeb";
import RfpMain from "../pages/Rfps/RfpMain";
import activeDocument from "../assets/activeDocument.svg";
import documentIcon from "../assets/document.svg";
import promptLibraryIcon from "../assets/PromptLibraryIcon.svg";
import activePromptLibraryIcon from "../assets/activePromptLibraryIcon.svg";
import activeSavedResponseIcon from "../assets/activeSavedResponse.svg";
import notActiveSavedResponse from "../assets/savedResponse.svg";

export default function Sidebar({ setToggleSidebar }) {
  const navigate = useNavigate();
  const userProfile = useSelector((state) => state?.user?.user);

  const handleDivClick = () => {
    navigate("/user-profile");
    setToggleSidebar(false);
  };
  const [hover, setHover] = useState(false);
  return (
    <>
      <div
        style={{ zIndex: 10 }}
        className="w-[312px] h-full bg-[#5151A6] flex flex-col justify-between  overflow-x-hidden webkit-scrollbar"
      >
        <div>
          <div className="py-4">
            <img
              className="w-[80px] h-[32px] shrink-0 ml-[24px]"
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="flex flex-col justify-between py-12 px-0 gap-[4px] font-semibold font-[Raleway]">
            <SidebarTeb
              nonActiveIcon={rfpsLogo}
              activeIcon={activeRfpsLogo}
              title="My Rfps"
              route="/rfp-session"
              setToggleSidebar={setToggleSidebar}
            />
            <SidebarTeb
              nonActiveIcon={promptLibraryIcon}
              activeIcon={activePromptLibraryIcon}
              title="Prompt Library (Beta)"
              route="/library"
              setToggleSidebar={setToggleSidebar}
            />
            <SidebarTeb
              nonActiveIcon={myTeamLogo}
              activeIcon={activeMyTeamLogo}
              title="My Team"
              route="/team"
              setToggleSidebar={setToggleSidebar}
            />
            <SidebarTeb
              nonActiveIcon={notActiveSavedResponse}
              activeIcon={activeSavedResponseIcon}
              title="Save Response"
              route="/save-response"
              setToggleSidebar={setToggleSidebar}
            />
            <SidebarTeb
              nonActiveIcon={documentIcon}
              activeIcon={activeDocument}
              title="My Documents"
              route="/my-documents"
              setToggleSidebar={setToggleSidebar}
            />
          </div>
        </div>
        <div className="pb-[24px]">
          <a
            href="mailto:matt@trymarvin.com"
            className={`flex rounded-lg py-3 px-4 ml-[16px] mr-[16px] gap-4 cursor-pointer  ${
              hover ? "bg-white text-[#232550]" : "text-white"
            }`}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <img
              src={hover ? activeSupport : supportLogo}
              alt="Support"
              className="w-6 h-6 shrink-0"
            />
            <span className="font-[Raleway] text-base not-italic leading-6">
              Support
            </span>
          </a>
          <hr className="w-[279px] mx-auto h-[3px] mt-5" />
          <div className="flex justify-between gap-[38px] mt-6 mx-6">
            <div className="flex items-center gap-3">
              <img
                src={"https://api.trymarvin.com/" + userProfile?.image}
                className="w-10 h-10 rounded-full bg-white cursor-pointer"
                onClick={handleDivClick}
                alt="User"
              />
              <div>
                <p className="text-sm not-italic font-bold text-white">
                  {userProfile?.first_name} {userProfile?.last_name}
                </p>
                <p className="text-sm not-italic font-normal text-white">
                  {userProfile?.email}
                </p>
              </div>
            </div>
            <Logout />
          </div>
        </div>
      </div>
    </>
  );
}
