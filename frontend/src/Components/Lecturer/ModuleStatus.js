import React from 'react';
import { FaRegChartBar } from "react-icons/fa6";
import { Link } from 'react-router-dom';


const StatusBox = () => {
    return (
        <Link to="/lecturer_module_view">
        <div className='status-box'>
            <div className='row' style={{ display: 'flex', alignItems: 'center', marginLeft:"25px"}}>
                <div className='module-icon'>
                    <FaRegChartBar />
                </div>
                <div className='module-name'>
                    <p>EE5261 Control System <br/>Design</p>
                </div>
                <div className='student-count'>
                    <p style={{ fontWeight:'bold'}}>85<br/>Students</p>
                </div>
            </div>
        </div>
        </Link>
    );
};

export default StatusBox;
