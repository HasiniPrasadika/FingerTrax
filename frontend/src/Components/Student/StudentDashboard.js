import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { MdOutlineArrowCircleRight } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../Admin/Admin.css';
import './Student.css';


const DashboardS = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [modules, setModules] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8070/api/modules/getallmod")
      .then((response) => {
        const filteredModules = response.data.filter(
          (module) => module.students.some(student => student.regNo === userInfo.regNo)
        );
        console.log(module.student);
        setModules(filteredModules);
      })
      .catch((error) => {
        console.error("Error fetching modules", error);
      });
  }, [modules]);


  return (
    <div className="dashboard">
    
        <div className="ruhuna-details" >
        <div>
          <span style={{ opacity: "0.8", padding: "10px", fontSize: "12px" }}>
            <GoTriangleRight />
            Student Dashboard
          </span>
        </div>
        <div className="row">
          <img src='/Images/logo_ruhuna.jpg'/>
        
        <div className='ruhuna-details-font'>
        <p>
          <span style={{fontSize:'50px'}}>Faculty of Engineering</span><br/>
          <span>University of Ruhuna</span>
        </p>
        </div>
        </div>
        </div>

    <div className="student-second-row-container">
    {modules.map((module,index)=>(
      <div className="module-box" key={index}>
      <div className="module-name">
        <div style={{ fontWeight: "bold" }}>
          <span>{module.modCode}</span>
        </div>
        <div style={{ fontWeight: "normal" }}>
          <span>{module.modName}</span>
        </div>
      </div>
      <div className="module-info">
        <Link
          to="/student-attendance-record" state={{module:module}}
          style={{
            color: "white",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "5px" }}>More Info</span>
          <span style={{ fontSize: "20px", marginTop: "5px" }}>
            <MdOutlineArrowCircleRight />
          </span>
        </Link>
      </div>
    </div>
    ))}

    </div>
    

    
</div>
  );
};

export default DashboardS;
