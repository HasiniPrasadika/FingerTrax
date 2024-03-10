import React from 'react';
import { Link } from 'react-router-dom';

const ModuleBox = () => {
    return (
        <div className='module-box'>
            <div className='module-name'>
                Electrical and Information Engineering
            </div>
            <div className='module-info'>
                <Link to="/student-attendance-record">More Info</Link>
            </div>
        </div>
    );
};

export default ModuleBox;
