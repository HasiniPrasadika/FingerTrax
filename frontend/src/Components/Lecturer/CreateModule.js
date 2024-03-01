import React from 'react';
import { FiEdit } from "react-icons/fi";
import { GoTriangleRight } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
 
const CreateModule = () => {
    return (
        <div className="lecturer-second-row-container">
            
            <div className="path-style">
                <br/><p style={{opacity:0.8}}><GoTriangleRight />Create Module</p>
            </div>
            <div>
                <h3 className='topic-style'>Add Module</h3>
            </div>
            <div className="module-form" >
            <form className="form-style">
                <div className="form-group row">
                    <label htmlFor="modulename" className="col-sm-4 col-form-label">Module Name</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="modulecode" className="col-sm-4 col-form-label">Module Code </label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="enroll" className="col-sm-4 col-form-label">Enrollment Key</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="semester" className="col-sm-4 col-form-label">Semester</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lecturehours" className="col-sm-4 col-form-label">Lecturer Hours</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        
                    />
                    </div>
                </div>
                <div className="form-row">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginRight: "25px", marginLeft: "5px" }}
                    >
                        Submit
                    </button>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ backgroundColor: "gray" }}
                    >
                        Reset
                    </button>
                </div>
            </form>
            
            </div>
            <br/>
            <div>
                <h3 className='topic-style'>Current Modules</h3>
            </div>
            <div className='table-design'>
            <table class="table">
                <thead style={{backgroundColor:'#dfeaf5'}}>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Module Code</th>
                    <th scope="col">Module Name</th>
                    <th scope="col">Semester</th>
                    <th scope="col">Enrollment Key</th>
                    <th scope="col">Lecturer Hours</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>EE5261</td>
                    <td>Control system design</td>
                    <td>4</td>
                    <td>ee5261</td>
                    <td>124</td>
                    <td><FiEdit /><span className='delete-icon'><RiDeleteBin6Line /></span></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>EE5261</td>
                    <td>Control system design</td>
                    <td>4</td>
                    <td>ee5261</td>
                    <td>124</td>
                    <td><FiEdit /><span className='delete-icon'><RiDeleteBin6Line /></span></td>
                    </tr>
                    <tr>

                    <th scope="row">3</th>
                    <td>EE5261</td>
                    <td>Control system design</td>
                    <td>4</td>
                    <td>ee5261</td>
                    <td>124</td>
                    <td><FiEdit /><span className='delete-icon'><RiDeleteBin6Line /></span></td>
                    </tr>

                </tbody>
            </table>
            </div>
        </div>

    );
};

export default CreateModule;
