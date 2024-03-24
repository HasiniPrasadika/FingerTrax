import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';

const Modules = () => {

    const {state} = useLocation();
    const semesterObject = state.semesterObject;

    


    const [modules, setModules] = useState([]);
    const depcode = semesterObject.depCode;
    const sem = semesterObject.semester;
    console.log(depcode);
    console.log(sem);
    
    

    useEffect(() => {
        // Make API call to fetch modules based on depCode and semester
        axios
          .post(`http://localhost:8070/api/modules/getmodulesbydepcode`, {depcode, sem})
          .then((response) => {
            setModules(response.data);
          })
          .catch((error) => {
            console.error("Error fetching modules", error);
          });
      }, [semesterObject]);

    
  return (
    <div className='en-container'>
            <div className='enrollment-container-one'>
                <div className='enrollment-second-container'>
                    <div>
                        <span style={{ padding: '5px', fontSize: '18px', color: '#4154F1' }}>Enrollment</span>
                    </div>
                    <div>
                        <Link to="/student_enrollment" style={{ opacity: '0.8', padding: '5px', fontSize: '12px' }}><GoTriangleRight /> Enrollment</Link>
                        <span style={{ opacity: '0.8', padding: '5px', fontSize: '12px' }}>/ Enrollment</span>
                    </div>
                    <div className='form-container'>
                        <div>
                            <h5>Modules</h5>
                            {modules.map((module, index) => ( 
                                 <div className='department-button row'>
                                 <div className='department-icon'><FaCaretRight /></div>
                                 <div><Link key={index} to="home" state={module}>Semester {module.modCode},{module.modName} </Link> 
                            </div>
                             </div>
                             )) }
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
  )
}

export default Modules
