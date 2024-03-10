import React from 'react';
import { GoTriangleRight } from "react-icons/go";


 
const StudentEnrollment = () => {
    return (
        <div className='en-container'>
        <div className='enrollment-container-one'>
        <div className='enrollment-second-container'>
            <div>
            <span style={{opacity:'0.8', padding:'5px' , fontSize:'14px'}}>Enrollment</span>    
            </div>
            <div>
                <span style={{opacity:'0.8', padding:'5px' , fontSize:'12px'}}><GoTriangleRight />Enrollment</span>
            </div>
            <div className='form-container' >
            <form>
                <div>
                    <div className="form-group" style={{marginBottom:10}}>
                        <h4>Module Selection</h4>
                    </div>
                    <div className="form-row" style={{marginBottom:10}}>
                        <div className="form-group col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputState">Department</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group col-md-6">
                            <div className="form-group">
                                <label htmlFor="inputState">Module</label>
                                <select id="inputState" className="form-control">
                                    <option selected>Choose...</option>
                                    <option>...</option>
                                    </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group form-group col-md-6">
                        <label htmlFor="inputState">Semester</label>
                            <select id="inputState" className="form-control">
                                <option selected>Choose...</option>
                                <option>...</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <button type="submit" className="btn btn-primary" style={{marginRight:'25px', marginLeft:'5px'}}>Select</button>
                                    <button type="submit" className="btn btn-primary" style={{backgroundColor:'gray'}}>Reset</button>
                                </div>
                            </div>
                        </form>
                
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
                            <div><h5>Self Enrollment</h5></div>
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
