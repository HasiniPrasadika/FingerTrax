import axios from "axios";
import { React, useState } from "react";
import { GoTriangleRight } from "react-icons/go";
import { useSelector } from "react-redux";
import ErrorMessage from "../ErrorMessage";
import SuccessMessage from "../SuccessMessage";

const LectureProfile = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const username = userInfo.userName;
  const [image, setimage] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [smessage, setSMessage] = useState(null);
  const [imessage, setIMessage] = useState(null);
  const [ismessage, setISMessage] = useState(null);
  //   useEffect(() => {

  //   }, [password]);
  const submitHandler = (e) => {
    try {
      e.preventDefault();
      if (image == "") {
        setIMessage("Please provide an image");
        setTimeout(() => {
          setIMessage(null);
        }, 3000);
        return;
      }

      axios
        .post(`http://localhost:8070/api/users/updateimage`, {
          image,
          username,
        })
        .then((response) => {
          setISMessage("Profile Photo updated successfully!");
          setTimeout(() => {
            setISMessage(null);
          }, 3000);
          resetHandler();
        })
        .catch((error) => {
          setIMessage("Failed to update Lecturer!");

          setTimeout(() => {
            setIMessage(null);
          }, 3000);
        });
    } catch (error) {
      setIMessage("Failed to change Profile Picture!");
      setTimeout(() => {
        setIMessage(null);
      }, 3000);
    }
  };
  const passwordSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Validate input fields
      if (!currentPassword || !newpassword) {
        setMessage("Please enter current password and new password");
        setTimeout(() => {
          setMessage(null);
        }, 3000);
        return;
      }

      // Call backend API to change password
      const response = await axios.post(
        "http://localhost:8070/api/users/change-password",
        {
          username,
          currentPassword,
          newpassword,
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
    setnewpassword("");
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
            <form
              onSubmit={submitHandler}
              style={{ margin: "2% 10% 2% 10%", width: "80%" }}
            >
              {imessage && (
                <ErrorMessage variant="danger">{imessage}</ErrorMessage>
              )}
              {ismessage && (
                <SuccessMessage variant="success">{ismessage}</SuccessMessage>
              )}
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
            <img src="/Images/change-password.png" alt="password" />
          </div>
          <div className="lecturer-add-form">
            <form
              onSubmit={submitHandler}
              style={{ margin: "2% 10% 2% 10%", width: "80%" }}
            >
              {message && (
                <ErrorMessage variant="danger">{message}</ErrorMessage>
              )}
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
