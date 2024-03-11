import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { GoTriangleRight } from "react-icons/go";

 
const StudentProfile = () => {
    return (
        <div className='profile-container'>
                        <div>
                <span style={{ padding: '5px', fontSize: '18px', color: '#4154F1' }}>Profile</span>    
            </div>
            <div>
                <span style={{opacity:'0.8',  fontSize:'12px'}}><GoTriangleRight />Profile</span>
            </div>
            <div className='profile-form-container'>

            <div className='edit-photo-area'>
            <h3 style={{marginBottom:'25px', marginTop:'10px', color: '#012970'}}>Edit Profile</h3>

                        <div className='profile-photo-preview' >
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src='/Images/profile.webp' alt='Profile' />
                                <div style={{ position: 'absolute', bottom: '10px', right: '20px', fontSize:'20px' }}>
                                    <FontAwesomeIcon icon={faCamera} style={{ background: 'white', borderRadius: '50%', padding: '5px' }} />
                                </div>
                            </div>
                        </div>
                        <div>
                        <form>
                            <div style={{ marginBottom: '30px' }}>
                                <div className="form-group">
                                    <label>Change Password :</label>
                                    <input type="text" className="form-control" placeholder="************"/>
                                    <h6 style={{fontSize:'9px',opacity:'0.8',marginLeft:'300px',marginTop:'5px'}}>Reset Password</h6>
                                </div>
                            </div>

                            
                        </form>
                    </div>
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <form>
                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Registration No : </label>
                            <input type="text" className="form-control" placeholder="EG/2020/4054"/>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Name with initials :</label>
                            <input type="text" className="form-control" placeholder="Madhushani G.H.K.P"/>
                        </div>

                        <div className="form-group" style={{ marginBottom: '20px' }}>
                            <label>Email Address : </label>
                            <input type="text" className="form-control" placeholder="madhushanigkhp@engruh.ac.lk"/>
                        </div>
                               
                        <div className="form-row">
                            <button type="submit" className="btn btn-primary" style={{marginRight:'15px', marginLeft:'225px'}}>Update Profile</button>
                            <button type="submit" className="btn btn-primary" style={{backgroundColor:'gray'}}>Cancel</button>
                        </div>
                    </form>
                </div>
                </div>
                </div>
        
    );
};

export default StudentProfile;
