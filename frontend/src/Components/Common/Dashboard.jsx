import { React, useEffect } from "react";
import "./Common_Styles/Dashboard.css";
import Sidebar from "./SideBar";
import { FaTh } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdApartment, MdPeopleAlt } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { PiStudentBold } from "react-icons/pi";
import {Route, Routes, useNavigate } from "react-router-dom";
import { logout } from "../../actions/userActions";
import Header from "./Header";

import { useDispatch, useSelector } from "react-redux";
import AdminDashboard from "../Admin/AdminDashboard";

import LecturerDashboard from "../Lecturer/LecturerDashboard";
import ViewModule from "../Lecturer/ViewModule";

import AddLecturer from "../Admin/AddLecturer";
import AddStudent from "../Admin/AddStudent";
import CreateModule from "../Lecturer/CreateModule";
import AbsenceLetter from "../Lecturer/AbsenceLetter";
import ModuleAccess from "../Lecturer/ModuleAccess";
import AddDepartment from "../Admin/AddDepartment";
const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {}, [userInfo]);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/"); // Redirect to login page after logout
  };

  const menuItem =
    userInfo.role == "admin"
      ? [
          {
            path: "/dashboard/admin_dashboard",
            name: "Dashboard",
            icon: <FaTh />,
          },
          {
            path: "/dashboard/add_department",
            name: "Department",
            icon: <MdApartment />,
          },
          {
            path: "/dashboard/add_lecturer",
            name: "Lecturer",
            icon: <MdPeopleAlt />,
          },
          {
            path: "/dashboard/add_student",
            name: "Student",
            icon: <PiStudentBold />,
          },
          {
            path: "/logout",
            name: "Logout",
            icon: <FiLogOut />,
            onClick: handleLogout,
          },
        ]
      : userInfo.role == "student"
      ? [
          {
            path: "/student_dashboard",
            name: "Dashboard",
            icon: <FaTh />,
          },
          {
            path: "/student_enrollment",
            name: "Enrollment",
            icon: <MdPeopleAlt />,
          },
          {
            path: "/student_absence_application",
            name: "Absence Letters",
            icon: <IoDocumentText />,
          },
          {
            path: "/student_profile",
            name: "Profile",
            icon: <PiStudentBold />,
          },
          {
            path: "/logout",
            name: "Logout",
            icon: <FiLogOut />,
            onClick: handleLogout,
          },
        ]
      : [
          {
            path: "/dashboard/lecturer_dashboard",
            name: "Dashboard",
            icon: <FaTh />,
          },
          {
            path: "/dashboard/create_module",
            name: "Create Module",
            icon: <MdPeopleAlt />,
          },
          {
            path: "/dashboard/absence_letter",
            name: "Absence Letters",
            icon: <PiStudentBold />,
          },
          {
            path: "/dashboard/module_access",
            name: "Module Access",
            icon: <PiStudentBold />,
          },

          {
            path: "/logout",
            name: "Logout",
            icon: <FiLogOut />,
            onClick: handleLogout,
          },
        ];
  return (
    <div className="dash-container">
      <div className="dash-content">
        <div className="left-bar">
          <Sidebar menu={menuItem} />
        </div>
        <div className="right-bar">
          <div className="title-bar">
            <Header menu={menuItem} />
          </div>
          <div className="main-content">

            <Routes>
              {userInfo.role === "admin" && (
                <>
                <Route path="/admin_dashboard" element={<AdminDashboard />} />
                <Route path="/add_department" element={<AddDepartment />} />
                <Route path="/add_lecturer" element={<AddLecturer />} />
                <Route path="/add_student" element={<AddStudent />} />
                </>
                
              )}
              {userInfo.role === "student" && (
                <Route path="/student_dashboard" element={<div />} />
              )}
              {userInfo.role === "lecturer" && (
                <>
                  <Route path="/lecturer_dashboard" element={<LecturerDashboard />} />
                  <Route path="/module/:moduleId" element={<ViewModule />} />
                  <Route path="/create_module" element={<CreateModule />} />
                  <Route path="/absence_letter" element={<AbsenceLetter />} />
                  <Route path="/module_access" element={<ModuleAccess />} />
                </>
              )}
              {/* Redirect to respective dashboard by default */}
              
            </Routes>
          </div>
        </div>
      </div>
      <div className="footer">
        <h1>Footer</h1>
      </div>
    </div>
  );
};

export default Dashboard;
