import { Route, Routes} from "react-router-dom";
import { Login, Signup } from "./pages";
import Dashboard from "./pages/Dashboard";
import Title from "./Title";
import Header from "./pages/Header";
import Sidebar from "./pages/Sidebar"; // Import your Sidebar component
import React, { useState, useEffect } from "react";

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
      </Routes>
    </div>
  );
};

export default App;
