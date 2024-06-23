import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {React, useState, useEffect} from "react";
import { GoTriangleRight } from "react-icons/go";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

const LectureProfile = () => {

    const [image, setimage] = useState("");
    const [password, setpassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
    const submitHandler = (e) => {

    }
    const passwordSubmitHandler = (e) => {

    }

    const handleImage = (e) => {
        const file = e.target.files[0];
        setFileToBase(file);
      };
    
      const setFileToBase = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setimage(reader.result);
        };
      };
      
  const resetHandler = () => {
    
    setimage("");
    
  };
  const passwordResetHandler = () => {
    
    setpassword("");
    setCurrentPassword("");
    
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
            <h3 className="photo-area-name">Change Profile Photo</h3>

            <img
              src={image ? image : "/Images/profile.webp"}
              alt="Profile"
              className="profile-photo-preview"
            />
          </div>
          <div className="lecturer-add-form">
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {smessage && (
              <SuccessMessage variant="success">{smessage}</SuccessMessage>
            )}
            <form
              onSubmit={submitHandler}
              style={{ margin: "2% 10% 2% 10%", width: "80%" }}
            >
              
             
             
              <div className="form-group row">
                <label
                  htmlFor="image"
                  className="col-sm-4 col-form-label dep-form-hor"
                >
                  Profile Image :
                </label>
                <div className="col-sm-8 dep-form-hor">
                  <input
                    type="file"
                    className="form-control"
                    id="image"
                    onChange={handleImage}
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
                  onClick={submitHandler}
                >
                  Change
                </button>

                <button
                  className="btn btn-primary dep-form-hor"
                  onClick={resetHandler}
                  style={{ backgroundColor: "grey" }}
                  type="reset"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>






        <div className="lecturer-details">
          <div className="lecture-photo-area">
            <h3 className="photo-area-name"> Change Passsword</h3>

            
          </div>
          <div className="lecturer-add-form">
            {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
            {smessage && (
              <SuccessMessage variant="success">{smessage}</SuccessMessage>
            )}
            <form
              onSubmit={submitHandler}
              style={{ margin: "2% 10% 2% 10%", width: "80%" }}
            >
              
             
             
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
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
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

export default LectureProfile;
