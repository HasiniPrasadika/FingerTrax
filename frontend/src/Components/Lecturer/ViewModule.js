import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import React, { useState } from "react";
import { BiDotsVerticalRounded, BiTachometer, BiUserCheck, BiUserX } from "react-icons/bi";
import { GoGraph, GoTriangleRight } from "react-icons/go";

import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const today = dayjs();

const isInCurrentMonth = (date) => date.get('month') === dayjs().get('month');

const ModuleDetails = () => {
    const [showCalendar, setShowCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);

    const handleCalendarChange = (date) => {
        setSelectedDate(date);
        setShowCalendar(false);
    };

    return (
        <div className="lecturer-first-row-container">
            <div className="topic-style">
                <p><br />Dashboard</p>
            </div>
            <div className="path-style">
                <p style={{ opacity: 0.8 }}><GoTriangleRight />Dashboard / EE5261 Control System Design</p>
            </div>
            <div className="second-container">
                <div className="second-column-frist-container">
                    
                        <div className="card-box">
                            <div className="row">
                                <h6 className="box-title">Present<span style={{ color: "gray", fontSize: "12px" }}> | {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}</span></h6>
                                <div style={{ marginLeft: "45px" }}>
                                    <BiDotsVerticalRounded onClick={() => setShowCalendar(true)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="icon-cart" >
                                    <div className="cart-icon-style">
                                    <BiUserCheck />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="count-of-stu">
                                        <h3>147</h3>
                                    </div>
                                    <div>
                                        <h6 style={{ color: 'green' }}>
                                            12%<span style={{ color: "gray", fontSize: "12px" }}> increase</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-box">
                            <div className="row">
                                <h6 className="box-title">Absence<span style={{ color: "gray", fontSize: "12px" }}> | {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}</span></h6>
                                <div style={{ marginLeft: "40px" }}>
                                    <BiDotsVerticalRounded onClick={() => setShowCalendar(true)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="icon-cart" >
                                    <div className="cart-icon-style">
                                    <BiUserX />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="count-of-stu">
                                        <h3>147</h3>
                                    </div>
                                    <div>
                                        <h6 style={{ color: 'red' }}>
                                            12%<span style={{ color: "gray", fontSize: "12px" }}> increase</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-box">
                            <div className="row">
                                <h6 className="box-title">Total Lecture Hours<span style={{ color: "gray", fontSize: "12px" }}> | {selectedDate ? selectedDate.toLocaleDateString() : "Select a date"}</span></h6>
                                <div style={{ marginLeft: "6px" }}>
                                    <BiDotsVerticalRounded onClick={() => setShowCalendar(true)} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="icon-cart" >
                                    <div className="cart-icon-style">
                                    <BiTachometer />
                                    </div>
                                </div>
                                <div className="column">
                                    <div className="count-of-stu">
                                        <h3>42</h3>
                                    </div>
                                    <div>
                                        <h6 style={{ color: 'blue' }}>
                                            25<span style={{ color: "gray", fontSize: "12px" }}> conducted</span>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>

                    <div className="report-container">
                        <GoGraph></GoGraph>
                    </div>
                </div>
                <div className="second-column-second-container">
                    <div className="lecture-details-box">
                        <h6 className="box-title">Start Lecture</h6>
                        <div className='column'>
                        <div className='row'>
                            <div className=' time-picker'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'TimePicker',
                                ]}>
                                <DemoItem >
                                <div className="time-label" style={{marginLeft:"10px"}}>Start Time</div>
                                <TimePicker defaultValue={dayjs('2022-04-17T15:30')}  />
                                </DemoItem>
                                
                            </DemoContainer>
                            </LocalizationProvider>
                            </div>
                            <div className=' time-picker'>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer
                                components={[
                                    'TimePicker',
                                ]}>
                                <DemoItem>
                                <div className="time-label" style={{marginLeft:"10px"}}>End Time</div>
                                <TimePicker defaultValue={dayjs('2022-04-17T15:30')} />
                                </DemoItem>
                                
                            </DemoContainer>
                            </LocalizationProvider>
                            </div>
                        </div>
                        <div style={{marginLeft:"10px", marginBottom:"10px"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DemoItem>
                            <div className="time-label" style={{marginLeft:"10px"}}>Date</div>
                            <DatePicker
                                defaultValue={today}
                                shouldDisableMonth={isInCurrentMonth}
                                views={['year', 'month', 'day']}
                            />
                            </DemoItem>
                        </DemoContainer>
                        </LocalizationProvider>
                        </div>
                        <div style={{marginLeft:"10px", marginBottom:"10px"}}>
                        <button className="btn btn-primary">View</button>
                        </div>
                        </div>
                    </div>
                    <div className="lecture-details-box">
                        
                    </div>
                    <div className="lecture-details-box">
                        
                    </div>
                </div>
            </div>
            {showCalendar && (
                <div className="calendar-dropdown">
                    <input
                        type="date"
                        value={selectedDate ? selectedDate.toISOString().split('T')[0] : ''}
                        onChange={(e) => handleCalendarChange(new Date(e.target.value))}
                    />
                </div>
            )}
        </div>
    );
};

export default ModuleDetails;
