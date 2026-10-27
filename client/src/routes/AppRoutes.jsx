import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Navbar from "../components/Navbar";
import ReportIssue from "../pages/ReportIssue";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Reports from "../pages/Reports";

function AppRoutes() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/report" element={<ReportIssue />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default AppRoutes;