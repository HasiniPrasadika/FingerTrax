
import React, { useState } from 'react';
import { GoTriangleRight } from "react-icons/go";

const AbsenceApplication = () => {

    const [selectedFile, setSelectedFile] = useState(null);
    const [progress, setProgress] = useState(0);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    function handleUpload() {
        // Perform upload operation here
        // For demonstration purposes, let's just log the file information
        console.log('File selected:', selectedFile);
    }

    return (
        <div className='absence-container'>
            <div>
                <span style={{ padding: '5px', fontSize: '18px', color: '#4154F1' }}>Absence Application</span>    
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

                    <div className='upload-file' style={{padding: '20px'}}>
                        <div className='doted-border'>
                            <div><span>Select a file or drag and drop here</span></div>
                            <div style={{opacity:'0.6', fontSize:'13.5px'}}><span>JPG, PNG or PDF, file size no more than 10MB</span></div>
                            <div>
                                <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                                <button type="button" className="upload-button" onClick={() => document.getElementById('fileInput').click()}>Upload File</button>
                            </div>
                            <div className='file-border' >
                                <div>{selectedFile && <p > {selectedFile.name}</p>}</div>
                            </div>
                            
                        </div>
                        
                    </div>
                    <div className="form-row">
                        <button type="submit" className="btn btn-primary" style={{marginRight:'15px', marginLeft:'700px'}}>Submit</button>
                        <button type="submit" className="btn btn-primary" style={{backgroundColor:'gray'}}>Reset</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AbsenceApplication;