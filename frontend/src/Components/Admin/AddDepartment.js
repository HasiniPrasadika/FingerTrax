import React, { useEffect, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import ErrorMessage from "../../Components/ErrorMessage";
import axios from "axios";

const Department = () => {
  const [depCode, setdepCode] = useState("");
  const [depName, setdepName] = useState("");
  const [noOfStu, setnoOfStu] = useState("");
  const [noOfLec, setnoOfLec] = useState("");
  const [message, setMessage] = useState(null);
    
  const submitHandler = (e) => {   
    
    try{
      e.preventDefault();
      axios
    .post("http://localhost:8070/api/departments/adddep",{ depCode, depName, noOfStu, noOfLec })
    .then((response) => {
      if(response != null){
        setMessage("Department Added successfully!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      }
      else{
        setMessage("Department Adding Unsuccessful!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      }
    })
    .catch((error) => {
      console.error('Error adding departments', error);
    });

    } catch (error) {
      setMessage("Failed to add Department!");
    }

    
  };
  const resetHandler = () => {
    setdepCode("");
    setdepName("");
    setnoOfStu("");
    setnoOfLec("");
  };


  return (
    <div className="dep-container">
      <div>
        <div>
          <span style={{ opacity: "0.8", padding: "10px", fontSize: "12px" }}>
            <GoTriangleRight />
            Department
          </span>
        </div>
        <div>
          <h3 style={{ marginLeft: "50px", marginTop: "10px" }}>
            Add Departments
          </h3>
        </div>
        <div className="dep-details">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
          <form onSubmit={submitHandler} className="form-style">
            <div className="form-group row">
              <label
                htmlFor="departmentCode"
                className="col-sm-4 col-form-label"
              >
                Department Code :
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="departmentCode"
                  name="departmentCode"
                  value={depCode}
                  onChange={(e) => setdepCode(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="departmentName"
                className="col-sm-4 col-form-label"
              >
                Department Name :
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="departmentName"
                  name="departmentName"
                  value={depName}
                  onChange={(e) => setdepName(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="numberOfLecturers"
                className="col-sm-4 col-form-label"
              >
                No. of Lecturers :
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="numberOfLecturers"
                  name="numberOfLecturers"
                  value={noOfLec}
                  onChange={(e) => setnoOfLec(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <label
                htmlFor="numberOfStudents"
                className="col-sm-4 col-form-label"
              >
                No. of Students :
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  className="form-control"
                  id="numberOfStudents"
                  name="numberOfStudents"
                  value={noOfStu}
                  onChange={(e) => setnoOfStu(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-sm-10 ">
              
                <button  type="submit" className="btn btn-primary">
                  Add
                </button>
                
              </div>
            </div>
          </form>
          
          <button className="btn btn-primary" onClick={resetHandler} style={{marginLeft:'10px'}}>
                  Reset
          </button>

          
          
        </div>
      </div>
    </div>
  );
};

export default Department;
