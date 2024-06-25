import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import "./Student Styles/EnrollModule.css";
import { GoTriangleRight } from "react-icons/go";
import "./Student Styles/ModuleEnrollment.css";

const EnrollModule = () => {
  const { state } = useLocation();
  const module = state.module;

  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);

  const [enrollKey, setEnrollKey] = useState();

  const navigate = useNavigate();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (module.students.some((student) => student.regNo === userInfo.regNo)) {
      console.log("You are already enrolled in this module.");

     
      navigate(`/dashboard/view_module/${module.modCode}`, { state: { module } });
      return;
    }
  }, []);


  const enrollHandler = (module) => {
    if (enrollKey === module.enrolKey) {
      const noOfStu = module.noOfStu + 1;
      const updatedStudents = [...module.students, { regNo: userInfo.regNo }];

      axios
        .put(`http://localhost:8070/api/modules/enrollmodule/${module._id}`, {
          noOfStu,
          students: updatedStudents,
        })
        .then((response) => {
          console.log("Enrollment successful");
          setSMessage("Enrollment successful.");
          setTimeout(() => {
            setSMessage(null);
            navigate(`/dashboard/view_module/${module.modCode}`, { state: { module } });
          }, 3000);
        })
        .catch((error) => {
          console.error("Error enrolling module:", error);
        });
    } else {
      console.log("Incorrect enrollment key");
      {
        setMessage("Incorrect enrollment key!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  return (
    <div className="en-container">
      <div className="enrollment-container-one">
        <div className="en-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Module Enrollment / Department / Semester / Module / Enroll
        </div>
        <div className="en-topic">
          <span>Module Enrollment</span>
        </div>
        <div className="en-details">
          <div className="en-self-topic">
            <span>Self Enrollment</span>
          </div>
          {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && (
        <SuccessMessage variant="success">{smessage}</SuccessMessage>
      )}
          <div class="enroll-key-box">
            <label>Enrollment Key : </label>
            <input
              type="text"
              placeholder=" Enter key here"

              value={enrollKey}
              onChange={(e) => setEnrollKey(e.target.value)}
            />
            <button
              type="submit"
              class="btn btn-primary enrollbtn"
              onClick={() => enrollHandler(module)}
              
            >
              Enroll Me
            </button>
          </div>
        </div>

        {/* <div >
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
                        <button type="submit"  class="btn btn-primary" onClick={() => enrollHandler(module)}>Enroll Me</button>
                    </div>
                    {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                </div>
            </div> */}
      </div>
    </div>
  );
};

export default EnrollModule;
