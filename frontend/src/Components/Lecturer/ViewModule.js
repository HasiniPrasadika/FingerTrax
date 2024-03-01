import React from "react";
import { GoTriangleRight } from "react-icons/go";

const ModuleDetails = () =>{
    return(
        <div className="lecturer-second-row-container">
            <div className="topic-style" >
                <p ><br/>Dashboard</p>
            </div>
            <div className="path-style">
                <p style={{opacity:0.8}}><GoTriangleRight />Dashboard / EE5261 Control System Design</p> 
            </div>
        </div>
    );
};

export default ModuleDetails;