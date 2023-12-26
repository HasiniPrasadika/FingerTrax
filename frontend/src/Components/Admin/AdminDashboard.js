import React from 'react';
import './Admin.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="row">
                <div className="ruhuna-details" >
                <div>
                    <h6 style={{opacity:'0.8', padding:'5px'}}>Dashboard</h6> 
                </div>
                <div><img src='/Images/ruhuna.jpeg' /> </div>
                <div className='ruhuna-details-font'>
                    <p>Faculty of Engineering </p>
                    <p>University of Ruhuna</p>
                </div>
                </div>
                </div>


                <div className="row">
                <div className="square-box"></div>
                <div className="square-box"></div>
                
            </div>
            <div className="row">
                <div className="square-box"></div>
                <div className="square-box"></div>
               
            </div>
            

            
        </div>
    );
};

export default Dashboard;
