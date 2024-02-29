import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";
import { registerstu } from "../userActions";
import { GoTriangleRight } from "react-icons/go";
import "./Admin.css";

const originData = [];
for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    Fullname: `Edward ${i}`,
    Registration_No: `EG/2020/00${i}`,
    Username: `Edward@${i}`,
    Department: `Department of Computer Engineering`,
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const Student = () => {
  const navigate = useNavigate();

  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [role, setrole] = useState("lecturer");
  const [fullName, setfullName] = useState("");
  const [depName, setdepName] = useState("");
  const [regNo, setregNo] = useState("");
  const [batch, setbatch] = useState("");
  const [fingerprintID, setfingerprintID] = useState("");
  const [image, setimage] = useState(
    ""
  );

  const [message, setMessage] = useState(null);
  const [imageMessage, setimageMessage] = useState(null);

  const dispatch = useDispatch();

  const stuUserRegister = useSelector((state) => state.stuUserRegister);
  const { loading, error, userInfo } = stuUserRegister;

  const handleImage = (e) =>{
    const file = e.target.files[0];
    setFileToBase(file);
    console.log(file);
  }

  const setFileToBase = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
      setimage(reader.result);
    }
  }
  

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(registerstu(userName, password, role, fullName, depName, regNo,fingerprintID, batch, image));
  };

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      Fullname: "",
      Registration_No: "",
      Username: "",
      Department: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Fullname",
      dataIndex: "Fullname",
      width: "20%",
      editable: true,
    },
    {
      title: "Registration Number",
      dataIndex: "Registration_No",
      width: "20%",
      editable: true,
    },
    {
      title: "Username",
      dataIndex: "Username",
      width: "15%",
      editable: true,
    },
    {
      title: "Department",
      dataIndex: "Department",
      width: "40%",
      editable: true,
    },
    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className="lecture-container" style={{ overflowX: "auto" }}>
      <div className="lecture-second-container" style={{ overflowX: "auto" }}>
        <div>
          <span style={{ opacity: "0.8", padding: "10px", fontSize: "12px" }}>
            <GoTriangleRight />
            Student
          </span>
        </div>
        <div className="lecture-details">
          <div className="lecture-photo-area">
            <h3 style={{ marginBottom: "25px", marginTop: "50px" }}>
              Add a Student
            </h3>
            <div className="profile-photo-preview">
              <div style={{ position: "relative", display: "inline-block" }}>
                <img src={image} alt="Profile" />
                
              </div>
            </div>
            <div>
                
              {/* <form>
                <div>
                  <div className="form-group" style={{ marginBottom: 10 }}>
                    <label>Fingerprint ID</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="form-row">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ marginRight: "25px", marginLeft: "5px" }}
                    >
                      Enter
                    </button>
                  </div>
                </div>
              </form> */}
            </div>
          </div>
          <div>
          {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
            <form onSubmit={submitHandler}>
              <div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    className="form-control"
                    placeholder="FullName"
                    onChange={(e) => setfullName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Registration Number</label>
                  <input
                    type="text"
                    value={regNo}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setregNo(e.target.value)}
                  />
                </div>
                <div className="form-row" style={{ marginBottom: 10 }}>
                  <div className="form-group col-md-6">
                    <label>Username</label>
                    <input
                      type="text"
                      value={userName}
                      className="form-control"
                      placeholder="Username"
                      onChange={(e) => setuserName(e.target.value)}
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label>Password</label>
                    <input
                      type="password"
                      value={password}
                      className="form-control"
                      placeholder="Password"
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Department Name</label>
                  <input
                    type="text"
                    value={depName}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setdepName(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Fingerprint ID</label>
                  <input
                    type="text"
                    value={fingerprintID}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setfingerprintID(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                  <label>Batch</label>
                  <input
                    type="text"
                    value={batch}
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => setbatch(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 10 }}>
                {imageMessage && (
            <ErrorMessage variant="danger">{imageMessage}</ErrorMessage>
          )}
                  <label>Upload Profile Picture</label>
                  <input
                    type="file"
                  
                    className="form-control"
                    placeholder="Name"
                    onChange={handleImage}
                  />
                </div>
                {/* <div className="form-group">
                  <label htmlFor="inputState">Department</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div> */}
                {/* <div className="form-group">
                  <label htmlFor="inputState">Module</label>
                  <select id="inputState" className="form-control">
                    <option selected>Choose...</option>
                    <option>...</option>
                  </select>
                </div> */}
                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ marginRight: "25px", marginLeft: "5px" }}
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
              </div>
            </form>
          </div>
        </div>
        <div className="lecturer-list">
          <h3 style={{ marginBottom: "20px" }}>List of Students</h3>
          <Form form={form} component={false}>
            <Table
              style={{ width: "auto" }}
              components={{
                body: {
                  cell: EditableCell,
                },
              }}
              bordered
              dataSource={data}
              columns={mergedColumns}
              rowClassName="editable-row"
              pagination={{
                onChange: cancel,
              }}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Student;
