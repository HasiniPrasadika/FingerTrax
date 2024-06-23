import React from "react";
import { BsCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { GoTriangleRight } from "react-icons/go";
import "./Lecturer Styles/AbsenceLetter.css";

const AbsenceLetter = () => {
  return (
    <div className="absence">
      <div className="absence-letter-container">
      <div className="dep-navigate">
        <span>
          <GoTriangleRight />
        </span>
        Absent Letter
      </div>
      <div className="view">
        <span>View Absent Letters</span>
      </div>

      <div className="dep-table-wrapper">
        <table className="dep-add-table">
          <thead style={{ backgroundColor: "#dfeaf5", borderRadius: 15 }}>
            <tr>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>
                #
              </th>
              <th scope="col" style={{ width: "20px"}}>
              Student Name
              </th>
              
              <th scope="col" style={{ width: "20px"}}>Registration No.</th>
              <th scope="col" style={{ width: "20px"}}>Absence Module</th>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence Date</th>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence For</th>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>Excuse Application</th>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Kavindi L.K.D.</td>
              <td>EG/2020/4018</td>
              <td>Control system design</td>
              <td>2023/08/25</td>
              <td>2 hours</td>
              <td>
                <button className="btn btn-primary">View</button>
              </td>
              <td>
                <BsCheckSquareFill
                  style={{ color: "green", fontSize: "18px" }}
                />
                <span className="delete-icon">
                  <BsFillXSquareFill />
                </span>
              </td>
            </tr>
            <tr>
              <td>Madhushika G.H.D.</td>
              <td>EG/2020/4055</td>
              <td>Control system design</td>
              <td>2023/08/25</td>
              <td>2 hours</td>
              <td>
                <button className="btn btn-primary">View</button>
              </td>
              <td>
                <BsCheckSquareFill
                  style={{ color: "green", fontSize: "18px" }}
                />
                <span className="delete-icon">
                  <BsFillXSquareFill />
                </span>
              </td>
            </tr>
            <tr>
              <td>Madhushani G.K.H.P.</td>
              <td>EG/2020/4054</td>
              <td>Control system design</td>
              <td>2023/08/25</td>
              <td>2 hours</td>
              <td>
                <button className="btn btn-primary">View</button>
              </td>
              <td>
                <BsCheckSquareFill
                  style={{ color: "green", fontSize: "18px" }}
                />
                <span className="delete-icon">
                  <BsFillXSquareFill />
                </span>
              </td>
            </tr>
            <tr>
              <td>Mallawaarachchi M.R.I.G.</td>
              <td>EG/2020/4066</td>
              <td>Control system design</td>
              <td>2023/08/25</td>
              <td>2 hours</td>
              <td>
                <button className="btn btn-primary">View</button>
              </td>
              <td>
                <BsCheckSquareFill
                  style={{ color: "green", fontSize: "18px" }}
                />
                <span className="delete-icon">
                  <BsFillXSquareFill />
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default AbsenceLetter;
