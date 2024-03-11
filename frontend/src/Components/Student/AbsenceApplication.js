import React, { useState } from "react";
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
    console.log("File selected:", selectedFile);
  }

  return (
    <div className="absence-container">
      <div>
        <span style={{ padding: "5px", fontSize: "18px", color: "#4154F1" }}>
          Absence Application
        </span>
      </div>
      <div>
        <span style={{ opacity: "0.8", padding: "5px", fontSize: "12px" }}>
          <GoTriangleRight />
          Absence Application
        </span>
      </div>
      <div className="absence-form-container">
        <h4>Absence Application</h4>
        <form>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputname">Name of the Student:</label>
              <input type="text" className="form-control" id="inputname" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputregno">Registration No: </label>
              <input type="text" className="form-control" id="inputregno" />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputmodule">Module Code:</label>
              <input type="text" className="form-control" id="inputmodule" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputmodulename">Module Name: </label>
              <input
                type="text"
                className="form-control"
                id="inputmodulename"
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputdate">Date: </label>
              <input type="date" className="form-control" id="inputdate" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputlecturehours">Lecture Hours: </label>
              <input
                type="text"
                className="form-control"
                id="inputlecturehours"
              />
            </div>
          </div>
          <div className="form-group form-group">
            <label htmlFor="inputdescription">Description:</label>
            <textarea
              className="form-control"
              id="inputdescription"
              rows="3"
            ></textarea>
          </div>

          <div className="upload-file" style={{ padding: "20px" }}>
            <div className="doted-border">
              <div>
                <span>Select a file or drag and drop here</span>
              </div>
              <div style={{ opacity: "0.6", fontSize: "13.5px" }}>
                <span>JPG, PNG or PDF, file size no more than 10MB</span>
              </div>
              <div>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="upload-button"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  Upload File
                </button>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="file-border" style={{ flexGrow: 1 }}>
                  <div>{selectedFile && <p>{selectedFile.name}</p>}</div>
                </div>
                <div className="col">
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: "85px",
                        marginLeft: "10px",
                        marginBottom: "10px",
                        marginTop: "15px",
                      }}
                    >
                      Continue
                    </button>
                  </div>
                  <div className="row">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "gray",
                        marginLeft: "10px",
                        width: "85px",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-row">
            <button
              type="submit"
              className="btn btn-primary"
              style={{ marginRight: "15px", marginLeft: "700px" }}
            >
              Submit
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
      <div>
        <h3 className="topic-style">Excuse Applications</h3>
      </div>
      <div className="excuse-application">
        <div className="table-design">
          <table class="table">
            <thead style={{ backgroundColor: "#dfeaf5" }}>
              <tr>
                <th scope="col">#</th>
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

                <td>Control system design</td>
                <td>2023/08/25</td>
                <td>2 hours</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
                <td style={{ color: "green" }}>Accepted</td>
              </tr>
              <tr>
                <th scope="row">2</th>

                <td>Control system design</td>
                <td>2023/08/25</td>
                <td>2 hours</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
                <td style={{ color: "green" }}>Accepted</td>
              </tr>
              <tr>
                <th scope="row">3</th>

                <td>Control system design</td>
                <td>2023/08/25</td>
                <td>2 hours</td>
                <td>
                  <button className="btn btn-primary">View</button>
                </td>
                <td>Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AbsenceApplication;
