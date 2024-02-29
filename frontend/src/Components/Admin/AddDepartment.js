import React from "react";
import { GoTriangleRight } from "react-icons/go";

const Department = () =>{
    return(
        <div className="dep-container">
            <div>
            <div>
                <span style={{ opacity: "0.8", padding: "10px", fontSize: "12px"}}>
                    <GoTriangleRight/>
                    Department
                </span>
            </div>
            <div>
                <h3 style={{marginLeft:"50px", marginTop: "10px"}}>Add Departments</h3>
            </div>
            <div className="dep-details" >
            <form className="form-style">
                <div className="form-group row">
                    <label htmlFor="departmentCode" className="col-sm-4 col-form-label">Department Code :</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="departmentCode"
                        name="departmentCode"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="departmentName" className="col-sm-4 col-form-label">Department Name         :</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="departmentName"
                        name="departmentName"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="numberOfLecturers" className="col-sm-4 col-form-label">No. of Lecturers :</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="numberOfLecturers"
                        name="numberOfLecturers"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="numberOfStudents" className="col-sm-4 col-form-label">No. of Students   :</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="numberOfStudents"
                        name="numberOfStudents"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10 ">
                    <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </div>
                </form>
            </div>
            </div>

        </div>
    );
}

export default Department;