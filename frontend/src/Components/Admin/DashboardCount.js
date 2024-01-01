import React from 'react';
import { FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';

const DashboardCount = () => {
    return (
        <div className='count-container' >
          <div >
            Electrical and information Engineering
          </div>  
          <div className='count'>
            <div className='lecture'>
            <div><FaChalkboardTeacher size={55} opacity={0.9} /></div>
            <div><span>Lectures</span></div>
            <div><span>65</span></div>
            

                
            </div>
            <div className='student'>
              <div><FaUserGraduate size={50} opacity={0.9} /></div>
              <div><span>Students</span></div>
              <div><span>200</span></div>
      
            </div>

          </div>
        </div>
    );
};

export default DashboardCount;