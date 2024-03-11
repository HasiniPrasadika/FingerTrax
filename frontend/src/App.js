import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { Login, Signup } from "./Components";

import Department from "./Components/Admin/AddDepartment";
import AddLecture from "./Components/Admin/AddLecture";
import AddStudent from "./Components/Admin/AddStudents";
import Dashboard from "./Components/Admin/AdminDashboard";
import AdminHeader from "./Components/Admin/AdminHeader";
import AdminSidebar from "./Components/Admin/AdminSidebar";

import LectureHeader from "./Components/Lecturer/LectureHeader";
import LectureProfile from "./Components/Lecturer/LectureProfile";
import LectureSidebar from "./Components/Lecturer/LectureSidebar";
import DashboardL from "./Components/Lecturer/LecturerDashboard";
import DashboardS from "./Components/Student/StudentDashboard";

import AbsenceAppicationView from "./Components/Lecturer/AbsenceApplicationView";
import CreateModule from "./Components/Lecturer/CreateModule";
import ModuleAccess from "./Components/Lecturer/ModuleAccess";
import ModuleDetails from "./Components/Lecturer/ViewModule";
import AbsenceApplication from "./Components/Student/AbsenceApplication";
import AttendanceRecord from "./Components/Student/AttendanceRecord";
import StudentEnrollment from "./Components/Student/Enrollment";
import StudentProfile from "./Components/Student/Profile";
import StudentHeader from "./Components/Student/StudentHeader";
import StudentSidebar from "./Components/Student/StudentSidebar";

const App = () => {
  const location = useLocation();
  const [hasHeader, setHeader] = useState(true); // Initially set to true
  const [hasSidebar, setSidebar] = useState(true); // Initially set to true
  const [hasTitle, setTitle] = useState(false);
  const [role, setRole] = useState(true);

  useEffect(() => {
    // Update the state based on the current URL path

    setHeader(location.pathname !== "/" && location.pathname !== "/signup");
    setSidebar(location.pathname !== "/" && location.pathname !== "/signup");
    setTitle(location.pathname === "/" || location.pathname === "/signup");
  }, [location]);

  useEffect(() => {
    // Determine the role based on the current URL path
    if (location.pathname.startsWith("/admin")) {
      setRole("admin");
    } else if (location.pathname.startsWith("/lecturer")) {
      setRole("lecturer");
    } else if (location.pathname.startsWith("/student")) {
      setRole("student");
    } else {
      setRole("");
    }
  }, [location]);

  const Sidebar =
    role === "admin"
      ? AdminSidebar
      : role === "student"
      ? StudentSidebar
      : LectureSidebar;
  const Header =
    role === "admin"
      ? AdminHeader
      : role === "lecturer"
      ? LectureHeader
      : StudentHeader;

  return (
    <div className="App">
      {hasHeader && <Header />}
      {hasSidebar && <Sidebar />}

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/admindashboard" element={<Dashboard />} />
        <Route path="/admin_department" element={<Department />} />
        <Route path="/admin_lecture_details" element={<AddLecture />} />
        <Route path="/admin_student_details" element={<AddStudent />} />

        <Route path="/studentdashboard" element={<DashboardS />} />
        <Route path="/student_enrollment" element={<StudentEnrollment />} />
        <Route
          path="/student_absence_application"
          element={<AbsenceApplication />}
        />
        <Route path="/student_profile" element={<StudentProfile />} />
        <Route
          path="/student-attendance-record"
          element={<AttendanceRecord />}
        />

        <Route path="/lecturedashboard" element={<DashboardL />} />
        <Route path="/lecture_create_module" element={<CreateModule />} />
        <Route
          path="/lecture_Absence_applications"
          element={<AbsenceAppicationView />}
        />
        <Route path="/lecture_module_access" element={<ModuleAccess />} />
        <Route path="/lecturer_module_view" element={<ModuleDetails />} />
        <Route path="/lecture_profile_update" element={<LectureProfile />} />
      </Routes>
    </div>
  );
};

export default App;
