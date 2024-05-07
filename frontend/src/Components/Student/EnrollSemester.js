import React from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';

const EnrollSemester = () => {

    const {state} = useLocation();
    const department = state.department;
   
    const noSemester = 8;

    const semesterLinks = Array.from({ length: noSemester }, (_, index) => ({ 
        depCode: department.depCode, 
        semester: (index + 1).toString()
      }));

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
                            <h5>Department</h5>
                            {semesterLinks.map((semesterObject, index) => ( 
                                 <div className='department-button row'>
                                 <div className='department-icon'><FaCaretRight /></div>
                                 <div><Link key={index} to="/student_module" state={{semesterObject: semesterObject}} style={{color:"white"}}>Semester {semesterObject.semester} </Link> 
                                 
                            </div>
                             </div>
                             )) }
                           
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}

export default EnrollSemester;
