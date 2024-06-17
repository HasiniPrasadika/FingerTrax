import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";


import Login from "./Components/Common/Login";
// import Signup from "../../enroll_01/Signup"
import Dashboard from "./Components/Common/Dashboard";


import LectureProfile from "./Components/Lecturer/LectureProfile";


import AttendanceRecord from "./Components/Student/AttendanceRecord";
import EnrollModule from "./Components/Student/EnrollModule";
import EnrollSemester from "./Components/Student/EnrollSemester";
import StudentEnrollment from "./Components/Student/Enrollment";
import Modules from "./Components/Student/Modules";
import StudentProfile from "./Components/Student/Profile";
import DashboardS from "./Components/Student/StudentDashboard";


const App = () => {
  


  


  return (
    <>
      

      <Routes>
        <Route path="/" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        {/* <Route path="/admin_dashboard" element={<AdminDashboard />} />



        <Route path="/lecturer_dashboard" element={<LecturerDashboard />} />
        <Route path="/lecturer_view_module" element={<ViewModule/>} /> */}

        <Route path="/studentdashboard" element={<DashboardS />} />
        <Route path="/student_enrollment" element={<StudentEnrollment />} />
        {/* <Route path="/student_absence_application" element={<AbsenceApplication />} /> */}
        <Route path="/student_profile" element={<StudentProfile />} />
        <Route path="/student-attendance-record" element={<AttendanceRecord />} />
        <Route path="/student_gotosemesters" element={<EnrollSemester />} />
        <Route path = "/student_module" element ={<Modules/>}/>
        <Route path ="/student_enroll_module" element={<EnrollModule/>}/>

        
        
       
        
        
        <Route path="/lecture_profile_update" element={<LectureProfile />} />
      </Routes>
    </>
  );
};

export default App;
