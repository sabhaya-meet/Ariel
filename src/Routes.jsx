import React from "react";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  Navigate,
} from "react-router-dom";
import UserProfile from "./pages/Rfps/UserProfile";
import Main from "./components/Main";
import Login from "./autho/Login";
import { useAuth0 } from "@auth0/auth0-react";
import RfpMain from "./pages/Rfps/RfpMain";
import TeamMain from "./pages/Team/TeamMain";
// import ReportMain from "./pages/reports/ReportMain";
import SavedResponsesMain from "./pages/SavedResponse/SavedResponsesMain";
import SupportMain from "./pages/support/SupportMain";
import RfpsDetails from "./pages/Rfps/RfpsDetails";
import RfpSession from "./pages/Rfps/RfpSession";
import DocumentMain from "./pages/document/DocumentMain";
import PromptLibraryMain from "./pages/promptLibrary/PromptLibraryMain";
import LessonData from "./pages/promptLibrary/LessonData";

export default function AppRoutes() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return null;
  }
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Main /> : <Login />}>
        <Route index element={<Navigate to="/rfp-session" />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/rfp-session" element={<RfpMain />} />
        <Route path="/library" element={<PromptLibraryMain />} />
        <Route path="/team" element={<TeamMain />} />
        <Route path="/save-response" element={<SavedResponsesMain />} />
        {/* <Route path="/support" element={<SupportMain />} /> */}
        <Route path="/session/:id" element={<RfpSession />} />
        <Route path="/my-documents" element={<DocumentMain />} />
        <Route path="/library/lesson" element={<LessonData />} />
      </Route>
    </Routes>
  );
}
