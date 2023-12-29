import React from 'react';
import { FaTh } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { MdPeopleAlt } from "react-icons/md";
import { PiStudentBold } from "react-icons/pi";
import { NavLink } from 'react-router-dom';
import './Admin.css';

const Sidebar = ({children}) => {
  const menuItem=[
    {
        path:"/",
        name:"Dashboard",
        icon:<FaTh/>
    },
    {
        path:"/lecture",
        name:"Lecture",
        icon:<MdPeopleAlt/>
    },
    {
        path:"/student",
        name:"Student",
        icon:<PiStudentBold/>
    },
    {
        path:"/logout",
        name:"Logout",
        icon:<FiLogOut/>
    },
    
]
return (
    <div className="container">
        <div className="sidebar" style={{width: "250px"}} >
            <div className="top_section">
                <div style={{marginLeft:"10px" ,marginTop:'20px', marginBottom:'20px'}} className="bars">
                    <img src='/Images/logo2.png' style={{ width: '200px', height: '70px' }}/>
                </div>
            </div>
            {
                menuItem.map((item, index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName="active" style={{marginLeft:"10px" ,marginTop:'20px', marginBottom:'20px', marginRight:'10px'}}>
                        <div className="icon" style={{fontSize:'25px'}}>{item.icon}</div>
                        <div style={{display:  "block" }} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main >{children}</main>
    </div>
);
};

export default Sidebar;