import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { GoTriangleRight } from "react-icons/go";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";
import axios from "axios";

const AdminProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const username = userInfo.userName;
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [imessage, setIMessage] = useState(null);
  const [ismessage, setISMessage] = useState(null);
  //   useEffect(() => {

  //   }, [password]);
 
  const passwordSubmitHandler = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
        setMessage("Invalid email address");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        return;
      }

    try {
      // Validate input fields
      if (!currentPassword || !newpassword || !userName || !email) {
        setMessage("Please enter current password and new password");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        return;
      }

      // Call backend API to change password
      const response = await axios.post(
        "http://localhost:8070/api/users/admin-change-password",
        {
          userName,
          currentPassword,
          newpassword,
          username, 
          email,
        }
      );

      if (response.status === 200) {
        setSMessage("Password changed successfully!");
        setTimeout(() => {
          setSMessage(null);
        }, 3000);
        setCurrentPassword("");
        setnewpassword("");
      } else {
        setMessage("Error changing password!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    } catch (error) {
      if (error.response.status === 401) {
        setMessage("Incorrect Current Password");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      } else {
        setMessage("Error changing password!");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const passwordResetHandler = () => {
    setnewpassword("");
    setCurrentPassword("");
    setUserName("");
    setEmail("");
  };
  return (
    <div className="addlec">
      <div className="add_lecturer-container">
        <div className="lec-navigate">
          <span>
            <GoTriangleRight />
          </span>
          Profile
        </div>


        <div className="lecturer-details">
          <div className="lecture-photo-area">
            <h3 className="photo-area-name"> Change Passsword</h3>
            <img src="/Images/change-password.png" alt="password"/>
          </div>
          <div className="lecturer-add-form">
            
            <form
              onSubmit={passwordSubmitHandler}
              style={{ margin: "2% 10% 2% 10%", width: "80%" }}
            >
              {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {smessage && (
              <SuccessMessage variant="success">{smessage}</SuccessMessage>
            )}
              <div className="form-group row">
                <label
                  htmlFor="currentPassword"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Current Password :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="password"
                    className="form-control"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="password"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  New Password :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Password"
                    value={newpassword}
                    onChange={(e) => setnewpassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="userName"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  New Username :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="text"
                    className="form-control"
                    id="userName"
                    name="userName"
                    value={userName}
                    placeholder="Userame"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label
                  htmlFor="email"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  New Email :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div
                className="form-group row"
                style={{ justifyContent: "center" }}
              >
                <button
                  type="submit"
                  className="btn btn-primary dep-form-hor"
                  onClick={passwordSubmitHandler}
                >
                  Change
                </button>

                <button
                  className="btn btn-primary dep-form-hor"
                  onClick={passwordResetHandler}
                  style={{ backgroundColor: "grey" }}
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
