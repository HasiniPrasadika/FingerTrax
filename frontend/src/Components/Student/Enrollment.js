import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa";
import { GoTriangleRight } from "react-icons/go";
import { Link } from 'react-router-dom';

const StudentEnrollment = () => {

    const [departments, setDepartments] = useState([]);
    useEffect(() => {
        axios
        .get('http://localhost:8070/api/departments/getalldep')
        .then((response) => {
          setDepartments(response.data);
        })
        .catch((error) => {
          console.error('Error fetching departments', error);
        });
      }, []);
    
    return (
        <div className='en-container'>
            <div className='enrollment-container-one'>
                <div className='enrollment-second-container'>
                    <div>
                        <span style={{ padding: '5px', fontSize: '18px', color: '#4154F1' }}>Enrollment</span>
                    </div>
                    <div>
                        <span style={{ opacity: '0.8', padding: '5px', fontSize: '12px' }}><GoTriangleRight /> Enrollment</span>
                    </div>
                    <div className='form-container'>
                        <div>
                            <h5>Department</h5>
                            {departments.map((department)=>(
                                <div className='department-button row' key={department._id}>
                                <div className='department-icon'><FaCaretRight /></div>
                                <div><Link to="/student_gotosemesters" state={{department:department}} className='department-link'> {department.depName}</Link></div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className='enrollment-container-two'>
                <div className='module-container' >
                    <div >
                        <h4 style={{marginBottom:'20px'}}>EE5311 :  Discrete Mathematics</h4>
                        <div className='profile-photo-preview' >
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src='/Images/1.jpeg' alt='Profile' />
                             
                            </div>
                            </div>
                            <div><h6 style={{marginBottom:'20px'}}>Teacher : Dr. Mihirini Wagarachchi</h6></div>
                    </div>
                    <div class='module-container'>
                        <div className='module-enrollment'>
                            <div style={{color:'#012970'}}><h5>Self Enrollment</h5></div>
                            <div class="blue-box">
                                <label>Enrollment Key : </label>
                                <input type="text" placeholder="Enter key here"/>
                                <button type="submit" class="btn btn-primary">Enroll Me</button>
                            </div>
                        </div>
    
                    </div>
                </div>
                </div>
                </div>

    );
};

export default StudentEnrollment;