import React from 'react';
import { GoTriangleRight } from "react-icons/go";
 
const ModuleAccess = () => {
    return (
        <div className="lecturer-second-row-container">
            
            <div className="path-style">
                <br/><p style={{opacity:0.8}}><GoTriangleRight />Module Access</p>
            </div>
            <div>
                <h3 className='topic-style'>Give Access</h3>
            </div>
            <div className="module-form" >
            <form className="form-style">
            <div class="form-row">
                <div class="form-group col-md-4">
                <label for="modulename">Module Name</label>
                <input type="text" class="form-control"  placeholder="Module Name"/>
                </div>
                <div class="form-group col-md-4">
                <label for="Module Code ">Module Code </label>
                <input type="text" class="form-control" placeholder="Module Code "/>
                </div>
                <div class="form-group col-md-4">
                <label for="AccessTo">Access To</label>
                <input type="text" class="form-control" placeholder="Access"/>
                </div>
            </div>
                
                <div className="form-row">
                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ marginRight: "25px", marginLeft: "5px" }}
                    >
                        Give Aceess
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
        </div>

    );
};

export default ModuleAccess;

