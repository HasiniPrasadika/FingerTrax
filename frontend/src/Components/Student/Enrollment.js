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
                </div>

    );
};

export default StudentEnrollment;