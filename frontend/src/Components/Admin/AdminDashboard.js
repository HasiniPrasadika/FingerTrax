import React from 'react';
import './Admin.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="row">
                <div className="ruhuna-details" >
                <div >
                 <h6>Dashboard</h6> </div>
                 <div><img src='/Images/ruhuna.jpeg' /> </div>
                 <div>
                    <p>Faculty of Engineering </p>
                    <p>University of Ruhuna</p>
                    </div>
                
               
                

                </div>
                </div>


            <div className="row">
                <div className="column"></div>
                <div className="column"></div>
            </div>

            <div className="row">
                <div className="column"></div>
                <div className="column"></div>
            </div>
        </div>
    );
};

export default Dashboard;
/*<h6>Dashboard</h6>
                    <img src='/Images/ruhuna.jpeg' />
                    <p>University of Ruhuna</p>*/