import { Form, Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { GoTriangleRight } from "react-icons/go";
import '../Admin/Admin.css';

const originData = [];
for (let i = 0; i < 5; i++) {
    originData.push({
        key: i.toString(),
        Date: `2024/01/0${i}`,
        Time:`8.30am- 10.30am`,
        Hours: `2 Hours`,
        Attendance: `Yes`,
    });
}

const AttendanceRecord = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [progressValue, setProgressValue] = useState(0);
    const progressEndValue = 65;

    useEffect(() => {
        const progressInterval = setInterval(() => {
            if (progressValue < progressEndValue) {
                setProgressValue(progressValue + 1);
            }
        }, 50);

        return () => clearInterval(progressInterval);
    }, [progressValue, progressEndValue]);

    const columns = [
        {
            title: 'Date',
            dataIndex: 'Date',
            width: '30%',
        },
        {
            title: 'Time',
            dataIndex: 'Time',
            width: '20%',
        },
        {
            title: 'Lecture Hours',
            dataIndex: 'Hours',
            width: '25%',
        },
        {
            title: 'Attendance',
            dataIndex: 'Attendance',
            width: '25%',
        },
    ];

    return (
        <div className='att-container'>
            <div className='att-second-container'>
            <div>
            <span style={{opacity:'0.8', padding:'5px' , fontSize:'14px'}}>Dashboard</span>    
            </div>
            <div>
                <span style={{opacity:'0.8', padding:'5px' , fontSize:'12px'}}><GoTriangleRight />Dashboard/EE5301 Discreate Mathematics </span>
            </div>
                <div className='att-details'>
                    <div className="attendance-square">
                        <div>Discreate Mathematics</div>
                        <div className="attendance-circle" style={{ background: `conic-gradient(#4d5bf9 ${progressValue*3.6}deg, #cadcff ${progressValue*3.6}deg)` }}>
                            <div className='value-container'>{progressValue}%</div>
                        </div>
                        <div>Lecture Hours: 20</div>
                        <div>Total Lecture Hours: 25</div>
                    </div>
                </div>
            </div>

            <div className='attendance-list'>
                <h3 style={{ marginBottom:'20px' }}>Attendance Record</h3>
                <Form form={form} component={false}>
                    <Table
                        style={{ width:'auto' }}
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                    />
                </Form>
            </div>
        </div>
    );
};

export default AttendanceRecord;
