const express = require("express");
const router = express.Router();

const {createAttendance, getDailyAttendance, getMyAttendance} = require('../Controllers/attendanceController')

router.post("/addattendance", createAttendance);
router.post("/dailyattendance", getDailyAttendance);
router.post("/getmyattendance", getMyAttendance);

module.exports = router;

/*
try{
      e.preventDefault();
      axios.post("http://localhost:8070/api/attendance/addattendance", {
        moduleCode,
        startTime,
        endTime,
        date
      })
      .then((response) => {
        if(response != null) {
          setMessage("Attendance added successfully!");
          console.log(response);
          //set firebase state
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        } else {
          setMessage("Attendance adding unsuccessful!");
          setTimeout(() => {
            setMessage(null);
          },3000);
        }
      })
      .catch((error) => {
        console.error("error adding attendance", error);
      })
      
    } catch (error) {
      setMessage("Failed to add attendance");
    }
*/