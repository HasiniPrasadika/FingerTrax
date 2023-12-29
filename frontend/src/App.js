import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { Login, Signup } from './Components';
import Dashboard from './Components/Admin/AdminDashboard';
import Header from './Components/Admin/Header';
import Lecture from './Components/Admin/Lecture';
import Sidebar from './Components/Admin/Sidebar';
import Student from './Components/Admin/Students';

const App = () => {
  const location = useLocation();
  const [hasHeader, setHeader] = useState(true); // Initially set to true
  const [hasSidebar, setSidebar] = useState(true); // Initially set to true
  const [hasTitle, setTitle] = useState(false);

  useEffect(() => {
    // Update the state based on the current URL path
    setHeader(location.pathname !== '/login' && location.pathname !== '/signup');
    setSidebar(location.pathname !== '/login' && location.pathname !== '/signup');
    setTitle(location.pathname === '/login' || location.pathname === '/signup');
  }, [location]);

  return (
    <div className="App">
      {hasHeader && <Header />}
      {hasSidebar && <Sidebar />}

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/lecture" element={<Lecture />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </div>
  );
};

export default App;
