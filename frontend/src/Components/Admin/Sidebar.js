import {React} from 'react';
import { useCookies } from "react-cookie";

import {useNavigate } from 'react-router-dom';

import './Admin.css';

const Sidebar = ({ children }) => {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    
    
    const handleLogout = () => {
      removeCookie("token");
      navigate("/login");
    };

  const menuItem = [
    {
      path: '/',
      name: 'Dashboard',
    },
    {
      path: '/lecture',
      name: 'Lecture',
    },
    {
      path: '/student',
      name: 'Student',
    },
    {
      path: '/login',
      name: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="container">
      <div className="sidebar" style={{ width: '250px' }}>
        <div className="top_section">
          <div style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px' }} className="bars">
            <img src="/Images/logo2.png" style={{ width: '200px', height: '70px' }} alt="Logo" />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <div
            key={index}
            className="link"
            style={{ marginLeft: '10px', marginTop: '20px', marginBottom: '20px', marginRight: '10px' }}
            onClick={item.onClick}
          >
            <div className="icon" style={{ fontSize: '25px' }}>
              {item.icon}
            </div>
            <div style={{ display: 'block' }} className="link_text">
              {item.name}
            </div>
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;

/**const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:8070",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
        ? toast(`Hello ${user}`, {
            position: "top-right",
          })
        : (removeCookie("token"), navigate("/login"));
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  }; */