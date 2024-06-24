import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useSelector } from "react-redux";
import { BsCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { GoTriangleRight } from "react-icons/go";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";


const AbsenceAppicationView = () => {

  // view letters
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [viewLettersLec, setviewLettersLec] = useState([]);
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);

  useEffect(() => {

    if (userInfo) {
      axios
        .get(`http://localhost:8070/api/absenceletters/lecturer/${userInfo.regNo}/letters`)
        .then((response) => {
          setviewLettersLec(response.data);
        })
        .catch((error) => {
          console.error("Error of view absence letters for lecturers", error);
        });
    }
  }, [userInfo]);


  // accept letters
  const handleAccept = (id) => {
    axios
      .put(`http://localhost:8070/api/absenceletters/letter/${id}/accept`)
      .then((response) => {
        setviewLettersLec(viewLettersLec.map(letter => letter._id === id ? { ...letter, action: true } : letter));
        setSMessage("Send a message as Accepted!");
        setTimeout(() => {
          setSMessage(null);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error accepting letter", err);
        setMessage("Failed to send a message to student!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);

      });
  };

  // reject letters
  const handleReject = (id) => {
    axios
      .put(`http://localhost:8070/api/absenceletters/letter/${id}/reject`)
      .then((response) => {
        setviewLettersLec(viewLettersLec.map(letter => letter._id === id ? { ...letter, action: false } : letter));
        setSMessage("Send a message as Rejected!");
        setTimeout(() => {
          setSMessage(null);
        }, 3000);
      })
      .catch((err) => {
        console.error("Error rejecting letter", err);
        console.error("Error accepting letter", err);
        setMessage("Failed to send a message to student!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });

  };

  const getActionStatus = (action) => {

    if (action === true) {
      return "Accepted";
    } else if (action === false) {
      return "Rejected";
    } else {
      return "Pending";
    }
  };



  return (
    <div className="lecturer-first-row-container">
      {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
      {smessage && <SuccessMessage variant="success">{smessage}</SuccessMessage>}

      <div className="path-style">
        <br /><p style={{ opacity: 0.8 }}><GoTriangleRight />Absence Appication</p>
      </div>
      <div>
        <h3 className='topic-style'>Absence Records</h3>
      </div>

      <div className='table-design'>
        <table class="table">
          <thead style={{ backgroundColor: '#dfeaf5' }}>
            <tr>

              <th scope="col">Student Name</th>
              <th scope="col">Registration No.</th>
              <th scope="col">Absence Module</th>
              <th scope="col">Absence Date</th>
              <th scope="col">Absence For</th>
              <th scope="col">Excuse Application</th>
              <th scope="col">Action</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {viewLettersLec.map((letter, index) => (
              <tr key={index}>
                <td>{letter.absStuName}</td>
                <td>{letter.absRegNo}</td>
                <td>{letter.absModName}</td>
                <td>{letter.absDate}</td>
                <td>{letter.absLecHours}</td>
                <td>
                  <a href={letter.letters.url} target="_blank" rel="noopener noreferrer">
                    <button className="btn btn-primary">View</button>
                  </a>
                </td>
                <td>
                  <BsCheckSquareFill style={{ color: "green", fontSize: "18px", cursor: "pointer" }}
                    onClick={() => handleAccept(letter._id)} />
                  <span className='delete-icon'>
                    <BsFillXSquareFill style={{ color: "red", fontSize: "18px", cursor: "pointer" }}
                      onClick={() => handleReject(letter._id)} />
                  </span>
                </td>
                <td style={{
                  color: letter.action === true ? "green"
                    : letter.action === false ? "red" : "blue"
                }}>
                  {getActionStatus(letter.action)}
                </td>

              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AbsenceAppicationView;



