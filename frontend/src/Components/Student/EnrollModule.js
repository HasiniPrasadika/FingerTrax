import axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import { useLocation } from 'react-router-dom';

const EnrollModule = () => {

    const {state} = useLocation();
    const module = state.module;

    
    const [enrollKey, setEnrollKey] = useState();
    

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    console.log(module.students[0]);

    const stuReg = userInfo.userName;

    const enrollHandler = () => {
        if (enrollKey === module.enrolKey) {
            const noOfStu = module.noOfStu + 1;
            const updatedStudents = [...module.students, { regNo: userInfo.userName }];
    
            axios.put(`http://localhost:8070/api/modules/enrollmodule/${module._id}`, {
                noOfStu,
                students: updatedStudents
            })
            .then(response => {
                console.log("Enrollment successful");
                // Optionally update UI or provide feedback to the user
            })
            .catch(error => {
                console.error("Error enrolling module:", error);
                // Handle error, display error message, etc.
            });
        } else {
            console.log("Incorrect enrollment key");
            // Optionally provide feedback to the user about incorrect key
        }
    };
    
  return (
    <div className='enrollment-container-two'>
                <div className='module-container' >
                    <div >
                        <h4 style={{marginBottom:'20px'}}>{module.modCode} {module.modName}</h4>
                        <div className='profile-photo-preview' >
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                
                                <img src='/Images/1.jpeg' alt='Profile' />
                             
                            </div>
                            </div>
                            <div><h6 style={{marginBottom:'20px'}}>Teacher : Dr.{module.modCoordinator} </h6></div>
                    </div>
                    <div class='module-container'>
                        <div className='module-enrollment'>
                            <div style={{color:'#012970'}}><h5>Self Enrollment</h5></div>
                            <div class="blue-box">
                                <label>Enrollment Key : </label>
                                <input type="text" placeholder="Enter key here" style={{color:"black"}}
                                  value={enrollKey} 
                                  onChange={(e)=>setEnrollKey(e.target.value)}/>
                                <button type="submit" class="btn btn-primary" onClick={enrollHandler}>Enroll Me</button>
                            </div>
                        </div>
    
                    </div>
                </div>
                </div>
  )
}

export default EnrollModule;
