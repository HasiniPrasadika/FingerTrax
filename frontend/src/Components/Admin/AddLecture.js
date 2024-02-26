import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from 'antd';
import React, { useState } from 'react';
import { GoTriangleRight } from "react-icons/go";
import './Admin.css';

    const originData = [];
    for (let i = 0; i < 100; i++) {
    originData.push({
        key: i.toString(),
        Fullname: `Edward ${i}`,
        Username:`Edward@${i}`,
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
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
        {editing ? (
            <Form.Item name={dataIndex} style={{margin: 0}}
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

const AddLecture = () => {
        const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const isEditing = (record) => record.key === editingKey;
    const edit = (record) => {
        form.setFieldsValue({
        Fullname: '',
        Username: '',
        Department: '',
        ...record,
        });
        setEditingKey(record.key);
    };
    const cancel = () => {
        setEditingKey('');
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
            setEditingKey('');
        } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
        }
        } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
        title: 'Fullname',
        dataIndex: 'Fullname',
        width: '20%',
        editable: true,
        },
        {
        title: 'Username',
        dataIndex: 'Username',
        width: '20%',
        editable: true,
        },
        {
        title: 'Department',
        dataIndex: 'Department',
        width: '40%',
        editable: true,
        },
        {
        title: 'operation',
        dataIndex: 'operation',
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
            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
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
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: isEditing(record),
        }),
        };
    });


    return (
        <div className='lecture-container'>
            <div className='lecture-second-container'>
                <div>
                <span style={{opacity:'0.8', padding:'10px' , fontSize:'12px'}}><GoTriangleRight />Lecturer</span>
                </div>
                <div className='lecture-details' >
                    <div className='lecture-photo-area'>
                        <h3 style={{marginBottom:'30px'}}>Add a Lecturer</h3>
                        <div className='profile-photo-preview' >
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <img src='/Images/profile.webp' alt='Profile' />
                                <div style={{ position: 'absolute', bottom: '10px', right: '20px', fontSize:'20px' }}>
                                    <FontAwesomeIcon icon={faCamera} style={{ background: 'white', borderRadius: '50%', padding: '5px' }} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <form>
                            <div>
                                <div className="form-group" style={{marginBottom:10}}>
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" placeholder="Name"/>
                                </div>
                                <div className="form-row" style={{marginBottom:10}}>
                                    <div className="form-group col-md-6">
                                        <label>Username</label>
                                        <input type="text" className="form-control" placeholder="Username"/>
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Password</label>
                                        <input type="password" className="form-control" placeholder="Password"/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="inputState">Department</label>
                                    <select id="inputState" className="form-control">
                                        <option selected>Choose...</option>
                                        <option>...</option>
                                    </select>
                                </div>
                                <div className="form-row">
                                    <button type="submit" className="btn btn-primary" style={{marginRight:'25px', marginLeft:'5px'}}>Submit</button>
                                    <button type="submit" className="btn btn-primary" style={{backgroundColor:'gray'}}>Reset</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                    <div className='lecturer-list' >
                        <h3 style={{marginBottom:'20px'}}>List of Lecturers</h3>
                        <Form form={form} component={false}>
                            <Table style={{width:'auto'}}
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

export default AddLecture;
