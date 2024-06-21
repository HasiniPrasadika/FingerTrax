import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Login from "./Components/Common/Login";
import Dashboard from "./Components/Common/Dashboard";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />    
        <Route path="/dashboard/*" element={<Dashboard />} />

      </Routes>
    </>
  );
};

export default App;
