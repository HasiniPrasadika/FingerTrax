import React from 'react';
import { RiMenuLine } from 'react-icons/ri';

const StudentHeader = () => {
    return (
        <div className='header'>
            <div className='header-content'>
            <RiMenuLine className='icon' />
            <span className='admin-name'>Admin Name</span>
            <img
            src='/Images/1.jpeg' alt='Admin' className='admin-image'/>
        </div>
        </div>
    );
};

export default StudentHeader;