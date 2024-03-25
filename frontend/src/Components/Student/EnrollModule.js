import React from 'react';
import { useLocation } from 'react-router-dom';

const EnrollModule = () => {

    const {state} = useLocation();
    const module = state.module;

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
                                <input type="text" placeholder="Enter key here"/>
                                <button type="submit" class="btn btn-primary">Enroll Me</button>
                            </div>
                        </div>
    
                    </div>
                </div>
                </div>
  )
}

export default EnrollModule
