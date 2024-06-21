import axios from "axios";
import React, { useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Student.css";


const AbsenceLetter = () => {

  const [absStuName, setabsStuName] = useState("");
  const [absRegNo, setabsRegNo] = useState("");
  const [absModCode, setabsModCode] = useState("");
  const [absModName, setabsModName] = useState("");
  const [absDate, setabsDate] = useState("");
  const [absLecHours, setabsLecHours] = useState("");
  const [description, setdescription] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [letters, setletters] = useState(null);

  const handleFileChange = (e) => {
    setletters(e.target.files[0]);
  };

  const submitHandler = (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("absStuName", absStuName);
      formData.append("absRegNo", absRegNo);
      formData.append("absModCode", absModCode);
      formData.append("absModName", absModName);
      formData.append("absDate", absDate);
      formData.append("absLecHours", absLecHours);
      formData.append("description", description);
      formData.append("pdf", letters);

      axios
        .post("http://localhost:8070/api/absenceletters/addletter",formData, {          
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response) {
            setSMessage("Absence letter submission successfully!");
            setTimeout(() => {
              setSMessage(null);
            }, 3000);
          }
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setMessage("Absence Letter is already submitted");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
          else if (error.response.status === 400) {
            setMessage("Only pdf files are allowed for submission!");
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          }
        });
    } catch (error) {
      setMessage("Failed to upload absense letter!");
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }

  };

  const resetHandler = () => {
    setabsStuName("");
    setabsRegNo("");
    setabsModCode("");
    setabsModName("");
    setabsDate("");
    setabsLecHours("");
    setdescription("");
    setletters(null);
  };

  const resetFileUpload = () => {
    setletters(null);
  };

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
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && <SuccessMessage variant="success">{smessage}</SuccessMessage>}
        <h4>Absence Application</h4>

        <form onSubmit={submitHandler}>
          <div className="form-row">

            <div className="form-group col-md-6">
              <label htmlFor="inputname">Name of the Student:</label>
              <input type="text" className="form-control" id="inputname"
                value={absStuName} onChange={(e) => { setabsStuName(e.target.value) }} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputregno">Registration No: </label>
              <input type="text" className="form-control" id="inputregno"
                value={absRegNo} onChange={(e) => { setabsRegNo(e.target.value) }} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputmodule">Module Code:</label>
              <input type="text" className="form-control" id="inputmodule"
                value={absModCode} onChange={(e) => { setabsModCode(e.target.value) }} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputmodulename">Module Name: </label>
              <input type="text" className="form-control" id="inputmodulename"
                value={absModName} onChange={(e) => { setabsModName(e.target.value) }} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputdate">Date: </label>
              <input type="date" className="form-control" id="inputdate"
                value={absDate} onChange={(e) => { setabsDate(e.target.value) }} />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="inputlecturehours">Lecture Hours: </label>
              <input type="text" className="form-control" id="inputlecturehours"
                value={absLecHours} onChange={(e) => { setabsLecHours(e.target.value) }} />
            </div>
          </div>

          <div className="form-group form-group">
            <label htmlFor="inputdescription">Description:</label>
            <textarea
              className="form-control"
              id="inputdescription"
              rows="3"
              value={description} onChange={(e) => { setdescription(e.target.value) }}
            ></textarea>
          </div>


          <div className="upload-file" style={{ padding: "20px" }}>
            <div className="doted-border">
              <div>
                <span>Select a file here</span>
              </div>
              <div style={{ opacity: "0.6", fontSize: "13.5px" }}>
                <span>PDF file size no more than 10MB</span>
              </div>
              <div>
                <input
                  type="file"
                  id="inputpdf"
                  style={{ display: "none" }}
                  onChange={handleFileChange}

                />
                <button
                  type="button"
                  className="upload-button"
                  style={{
                    width: "85px",
                    marginLeft: "10px",
                    marginBottom: "10px",
                    marginTop: "15px"
                  }}
                  onClick={() => document.getElementById("inputpdf").click()}
                >Upload</button>

              </div>

              <div style={{ display: "flex", alignItems: "center" }}>

                <div className="file-border" style={{ flexGrow: 1 }}>
                  <div>{letters && <p>{letters.name}</p>}</div>
                </div>
                <div className="col">
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        width: "85px",
                        marginLeft: "10px",
                        marginBottom: "10px",
                        marginTop: "15px",
                      }}


                    >Continue </button>
                  </div>
                  <div className="row">
                    <button
                      type="button"
                      className="btn btn-primary"
                      style={{
                        backgroundColor: "gray",
                        marginLeft: "10px",
                        width: "85px",
                      }}
                      onClick={resetFileUpload}
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
              style={{ marginRight: "15px", marginLeft: "700px" }} > Submit
            </button>

            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "gray" }}
              onClick={resetHandler}
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
  
}

export default AbsenceLetter;
