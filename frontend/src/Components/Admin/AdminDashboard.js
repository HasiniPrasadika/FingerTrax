import React, { useEffect } from "react";
import { GoTriangleRight } from "react-icons/go";
import { FaChalkboardTeacher, FaUserGraduate } from "react-icons/fa";
import './Admin.css';
import DashboardCount from './DashboardCount';

import { useDispatch, useSelector } from "react-redux";
import { listDepartments } from "../../actions/depActions";
import Loading from "../../Components/Loading";
import ErrorMessage from "../../Components/ErrorMessage";

const Dashboard = () => {
  const dispatch = useDispatch();
  const departmentList = useSelector((state) => state.depList);
  const { loading, error, departments } = departmentList;

  useEffect(() => {
    dispatch(listDepartments());
  }, [dispatch]);

  return (
    <div className="dashboard-container">
      <div className="ruhuna-details" style={{marginLeft:"0px"}}>
        <div>
          <span style={{opacity:'0.8', marginLeft:'10px', fontSize:'12px'}}><GoTriangleRight />Admin Dashboard </span>
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

      <div className="second-row-container">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          departments.map((department, index) => (
            <div className="item" key={index}>
              <div className='count-container' >
                <div>
                  {department.depName}
                </div>  
                <div className='count'>
                  <div className='lecture'>
                    <div><FaChalkboardTeacher size={55} opacity={0.9} /></div>
                    <div><span>Lectures</span></div>
                    <div><span>{department.noOfLec}</span></div>
                  </div>
                  <div className='student'>
                    <div><FaUserGraduate size={50} opacity={0.9} /></div>
                    <div><span>Students</span></div>
                    <div><span>{department.noOfStu}</span></div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
