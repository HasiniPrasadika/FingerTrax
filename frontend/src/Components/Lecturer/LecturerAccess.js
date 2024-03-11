import React from 'react';
import { BsDot } from "react-icons/bs";
import { FaRegChartBar } from "react-icons/fa6";

const AccessBox = () => {
    return (
        <div className='module-access-box'>
            <div className='column'>
            <div className='row' style={{ display: 'flex', alignItems: 'center', marginLeft:"25px"}}>
                <div className='module-icon'>
                    <FaRegChartBar />
                </div>
                <div className='module-name'>
                    <p>EE5261 Discrete Mathematics</p>
                </div>
                
            </div>
            <div className='access-lecturer-names'>
                <h6><BsDot /> Dr. Mihirini Wagaarachchi</h6>
                <h6><BsDot /> Dr. Ruwan Appuhamy </h6>
                <h6><BsDot /> Dr. Kumudu Seneviratna</h6>
                </div>
            </div>
            
        </div>
        
    );
};

export default AccessBox;
