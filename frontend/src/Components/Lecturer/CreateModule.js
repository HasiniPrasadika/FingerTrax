import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { GoTriangleRight } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import Loading from "../../Components/Loading";
import { createModuleAction } from "../../actions/modActions";
 
const CreateModule = () => {
const [modCode, setmodCode] = useState("");
const [modName, setmodName] = useState("");
const [enrolKey, setenrolKey] = useState("");
const [semester, setSemester] = useState("");
const [lecHours, setLecHours] = useState("");
const [message, setMessage] = useState(null);
const dispatch = useDispatch();

const modAdd = useSelector((state) => state.modAdd);
  const { loading, error, modules } = modAdd;

  const submitHandler = (e) => {   
    
    try{
      e.preventDefault();
      dispatch(createModuleAction(modCode, modName, enrolKey, semester, lecHours));
      setMessage("Module Added successfully!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);

    } catch (error) {
      setMessage("Failed to add Module!");
    }

    
  };
  const resetHandler = () => {
    setmodCode("");
    setmodName("");
    setenrolKey("");
    setLecHours("");
    setSemester("");
    
  };
 
    return (
        <div className="lecturer-first-row-container">
            
            <div className="path-style">
                <br/><p style={{opacity:0.8}}><GoTriangleRight />Create Module</p>
            </div>
            <div>
                <h3 className='topic-style'>Add Module</h3>
            </div>
            <div className="module-form" >
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            <form onSubmit={submitHandler} className="form-style">
                <div className="form-group row">
                    <label htmlFor="modulename" className="col-sm-4 col-form-label">Module Name</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="modName"
                  name="modName"
                  value={modName}
                  onChange={(e) => setmodName(e.target.value)}
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="modulecode" className="col-sm-4 col-form-label">Module Code </label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="modCode"
                  name="modCode"
                  value={modCode}
                  onChange={(e) => setmodCode(e.target.value)}
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="enroll" className="col-sm-4 col-form-label">Enrollment Key</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="enrolKey"
                  name="enrolKey"
                  value={enrolKey}
                  onChange={(e) => setenrolKey(e.target.value)}
                        
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="semester" className="col-sm-4 col-form-label">Semester</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="semester"
                  name="semester"
                  value={semester}
                  onChange={(e) => setSemester(e.target.value)}
                    />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="lecturehours" className="col-sm-4 col-form-label">Lecturer Hours</label>
                    <div className="col-sm-8">
                    <input
                        type="text"
                        className="form-control"
                        id="lecHours"
                  name="lecHours"
                  value={lecHours}
                  onChange={(e) => setLecHours(e.target.value)}
                        
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
                    
                        className="btn btn-primary"
                        style={{ backgroundColor: "gray" }}
                        onClick={resetHandler}
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
