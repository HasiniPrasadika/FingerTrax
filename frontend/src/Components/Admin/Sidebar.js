import React, { useState } from 'react';
import { FaRegChartBar, FaTh, FaUserAlt } from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import './Admin.css';

const Sidebar = ({children}) => {
  const[isOpen ,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);

  const menuItem=[
    {
        path:"/",
        name:"Dashboard",
        icon:<FaTh/>
    },
    {
        path:"/lecture",
        name:"Lecture",
        icon:<FaUserAlt/>
    },
    {
        path:"/student",
        name:"Student",
        icon:<FaRegChartBar/>
    },
    {
      path:"/logout",
      name:"Logout",
      icon:<FaRegChartBar/>
  },
    
]
return (
  <div className="container">
     <div className="sidebar" style={{width: "200px"}} >
         <div className="top_section">
             <div style={{marginLeft:"5px" }} className="bars">
                 <img src='/Images/logo2.png' style={{ width: '100px', height: '40px' }}/>
             </div>
         </div>
         {
             menuItem.map((item, index)=>(
                 <NavLink to={item.path} key={index} className="link" activeclassName="active">
                     <div className="icon">{item.icon}</div>
                     <div style={{display:  "block" }} className="link_text">{item.name}</div>
                 </NavLink>
             ))
         }
     </div>
     <main>{children}</main>
  </div>
);
};

export default Sidebar;