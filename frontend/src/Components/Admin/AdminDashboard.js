import React from 'react';
import './Admin.css';

const Dashboard = () => {
    return (
        <div className="dashboard">
            <div className="row">
                <div className="ruhuna-details">
                    <h6>Dashboard</h6>
                    <img src='/Images/ruhuna.jpeg' />
                    <p>University of Ruhuna</p>
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
