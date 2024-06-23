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
                if (response) {
                    setSMessage("Send message as Accepted!");
                    setTimeout(() => {
                        setSMessage(null);
                    }, 3000);
                }
            })
            .catch((err) => {
                setMessage("Failed to make response!");
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
                if (response) {
                    setSMessage("Send message as Rejected!");
                    setTimeout(() => {
                        setSMessage(null);
                    }, 3000);
                }
            })
            .catch((err) => {
                setMessage("Failed to make response!");
                setTimeout(() => {
                    setMessage(null);
                }, 3000);
            });
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
                        </tr>
                    </thead>
                    <tbody>
                        {viewLettersLec.map((letter) => (
                            <tr key={letter._id}>
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

                            </tr>
                        ))}

                    </tbody>
                </table>
            </div>
        </div>
    );
>>>>>>> Stashed changes
};

export default AbsenceLetter;
