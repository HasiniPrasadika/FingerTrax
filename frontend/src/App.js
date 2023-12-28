import React, { useState, useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import './App.css';
import { Login, Signup } from './Components';
import Dashboard from './Components/Admin/AdminDashboard';
import Lecture from './Components/Admin/Lecture';
import Sidebar from './Components/Admin/Sidebar';
import Student from './Components/Admin/Students';
import Header from './Components/Admin/Header';
import Title from './Title.js'

const App = () => {
  const [hasHeader, setHeader] = useState(false);
  const [hasSidebar, setSidebar] = useState(false);
  const [hasTitle, setTitle] = useState(false);

  useEffect(() => {
    // Add logic to determine whether to show header and sidebar based on the route
    const location = window.location.pathname;
    setHeader(location !== "/login" && location !== "/signup");
    setSidebar(location !== "/login" && location !== "/signup");
    setTitle(location === "/login" || location === "/signup");

    // Alternatively, you can use React Router's useLocation hook to get the current location
    // and update the state accordingly
    // const location = useLocation();
    // setHeader(location.pathname !== "/login" && location.pathname !== "/signup");
    // setSidebar(location.pathname === "/");
  }, []);

  return (
    <div className="App">
      {hasHeader && <Header />}
      {hasSidebar && <Sidebar />}
      {hasTitle && <Title />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/lecture' element={<Lecture/>}/>
        <Route path='/student' element={<Student/>}/>
      </Routes>
    </div>
  );
};




export default App;
