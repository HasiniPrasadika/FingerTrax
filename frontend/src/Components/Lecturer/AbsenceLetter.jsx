import axios from "axios";
import React, { useEffect, useState } from 'react';
import { BsCheckSquareFill, BsFillXSquareFill } from "react-icons/bs";
import { GoTriangleRight } from "react-icons/go";
import { useSelector } from "react-redux";
import ErrorMessage from "../../Components/ErrorMessage";
import SuccessMessage from "../../Components/SuccessMessage";
import "./Lecturer Styles/AbsenceLetter.css";


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
    if (window.confirm("Are you sure you want to accept this?")) {
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

    }  
   
  };

  // reject letters
  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this?")) {
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

    }
    

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
    <div className='absense-letter-lec'>
      <div className="absense_lec_record_container">
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {smessage && <SuccessMessage variant="success">{smessage}</SuccessMessage>}

        <div className="abc-application">
        <span>
          <GoTriangleRight />
        </span>
        Absence Application
      </div>
      <div className="abs-topic">
        <span>Absence Record</span>
      </div>

        <div className='abs-table-wrapper'>
          <table class="abs-add-table">
            <thead style={{ backgroundColor: "#dfeaf5", borderRadius: 15 }}>
              <tr>
              <th scope="col" style={{ width: "5px", textAlign: "center" }}>
                #
              </th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Student Name</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Registration No.</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence Module</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence Date</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Absence For</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Excuse Application</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Action</th>
                <th scope="col" style={{ width: "5px", textAlign: "center" }}>Status</th>

              </tr>
            </thead>
            <tbody>
              {viewLettersLec.map((letter, index) => (
                <tr key={index}>
                  <th style={{ textAlign: "center" }}>{index + 1}</th>
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
                    <span className="accept-icon">
                    <BsCheckSquareFill 
                      onClick={() => handleAccept(letter._id)} className="accept-i" />
                    </span>
                    <span className='delete-icon'>
                      <BsFillXSquareFill 
                        onClick={() => handleReject(letter._id)} className="delete-i" />
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
    </div>
  );
};

export default AbsenceAppicationView;



