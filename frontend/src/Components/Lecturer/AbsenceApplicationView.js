import React from 'react';
import { BsCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { GoTriangleRight } from "react-icons/go";
 
const AbsenceAppicationView = () => {
    return (
        <div className="lecturer-first-row-container">
            
            <div className="path-style">
                <br/><p style={{opacity:0.8}}><GoTriangleRight />Absence Appication</p>
            </div>
            <div>
                <h3 className='topic-style'>Absence Records</h3>
            </div>
            
            <div className='table-design'>
            <table class="table">
                <thead style={{backgroundColor:'#dfeaf5'}}>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Student Name</th>
                    <th scope="col">Registration No.</th>
                    <th scope="col">Absence Module</th>
                    <th scope="col">Absence Date</th>
                    <th scope="col">Absence For</th>
                    <th scope="col">Application form</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Kavindi L.K.D.</td>
                    <td>EG/2020/4018</td>
                    <td>Control system design</td>
                    <td>2023/08/25</td>
                    <td>2 hours</td>
                    <td><button className="btn btn-primary">View</button></td>
                    <td><BsCheckSquareFill style={{color:"green", fontSize:"18px"}}/><span className='delete-icon'><BsFillXSquareFill /></span></td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Kavindi L.K.D.</td>
                    <td>EG/2020/4018</td>
                    <td>Control system design</td>
                    <td>2023/08/25</td>
                    <td>2 hours</td>
                    <td><button className="btn btn-primary">View</button></td>
                    <td><BsCheckSquareFill style={{color:"green", fontSize:"18px"}}/><span className='delete-icon'><BsFillXSquareFill /></span></td>
                    </tr>
                    <tr>
                    <th scope="row">3</th>
                    <td>Kavindi L.K.D.</td>
                    <td>EG/2020/4018</td>
                    <td>Control system design</td>
                    <td>2023/08/25</td>
                    <td>2 hours</td>
                    <td><button className="btn btn-primary">View</button></td>
                    <td><BsCheckSquareFill style={{color:"green", fontSize:"18px"}}/><span className='delete-icon'><BsFillXSquareFill /></span></td>
                    </tr>

                </tbody>
            </table>
            </div>
        </div>
    );
};

export default AbsenceAppicationView;
