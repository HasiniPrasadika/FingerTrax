import React from 'react';
import { RiMenuLine } from 'react-icons/ri';
import './Dashboard.css';

const Header = () => {
  return (
      <div className='header'>
          <div className='header-content'>
          <RiMenuLine className='icon' />
          <span className='admin-name'>Admin Name</span>
          <img
          src='/Images/1.jpeg' className='admin-image'/>
      </div>
      </div>
  );
};


export default Header;

/** <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button> */