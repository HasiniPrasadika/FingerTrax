
import React, { useState } from 'react';
import { GoTriangleRight } from "react-icons/go";

const AbsenceApplication = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handleUpload = () => {
        // Simulating upload process
        let currentProgress = 0;
        const interval = setInterval(() => {
            currentProgress += 10;
            setProgress(currentProgress);
            if (currentProgress >= 100) {
                clearInterval(interval);
            }
        }, 500);
    };
    return (
        <div className='absence-container'>
            <div>
                <span style={{opacity:'0.8', padding:'5px' , fontSize:'14px'}}>Absence Application</span>    
            </div>
            <div>
                <span style={{opacity:'0.8', padding:'5px' , fontSize:'12px'}}><GoTriangleRight />Absence Application</span>
            </div>
            <div className='absence-form-container'>
                <h4>Absence Application</h4>
                <form>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputname">Name of the Student:</label>
                            <input type="text" class="form-control" id="inputname"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputregno">Registration No: </label>
                            <input type="text" class="form-control" id="inputregno"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputmodule">Module Code:</label>
                            <input type="text" class="form-control" id="inputmodule"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputmodulename">Module Name: </label>
                            <input type="text" class="form-control" id="inputmodulename"/>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="inputdate">Date: </label>
                            <input type="date" class="form-control" id="inputdate"/>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="inputlecturehours">Lecture Hours: </label>
                            <input type="text" class="form-control" id="inputlecturehours"/>
                        </div>
                    </div>
                    <div class="form-group form-group ">
                        <label for="inputdescription">Description:</label>
                        <textarea class="form-control" id="inputdescription" rows="3"></textarea>
                    </div>

                    <div className='upload-file'>
                    <div className="form-group">
                        <label htmlFor="fileInput">Select File:</label>
                        <input type="file" id="fileInput" onChange={handleFileChange} />
                    </div>
                
                    <button type="button" className="btn btn-primary" onClick={handleUpload}>Upload</button>
               </div>
               <div className="form-row">
                            <button type="submit" className="btn btn-primary" style={{marginRight:'15px', marginLeft:'700px'}}>Submit</button>
                            <button type="submit" className="btn btn-primary" style={{backgroundColor:'gray'}}>Reset</button>
                        </div> </form>
                </div>
                </div>
              
        
        
    );
};

export default AbsenceApplication;
