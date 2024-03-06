const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const depRoute = require("./Routes/DepRoute");
const bodyParser = require('body-parser');
const { SerialPort } = require('serialport');


app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

const portName = "COM4"; // Change this to match your Arduino's serial port name
const baudRate = 9600;


const port = new SerialPort({
  path: portName,
  baudRate: baudRate,
  dataBits: 8,
  stopBits: 1,
  parity: 'none',
  });

// Function to send fingerprint ID to Arduino
const sendFingerprintIDToArduino = (fingerprintID) => {
  // Convert the fingerprint ID to a string
  const dataToSend = fingerprintID.toString();

  // Write the data to the serial port
  port.write(dataToSend, (err) => {
    if (err) {
      console.error("Error writing to serial port:", err);
    } else {
      console.log("Fingerprint ID sent to Arduino:", dataToSend);
    }
  });
};


mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error(err));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/users", authRoute);
app.use("/api/departments", depRoute);
app.post("/enrollFingerprint", (req, res) => {
  const fingerprintID = req.body.fingerprintID;
  // Call the function to enroll fingerprint with the provided ID
  // Example: enrollFingerprintFunction(fingerprintID);
  sendFingerprintIDToArduino(fingerprintID); // Send fingerprint ID to Arduino
  res.send("Fingerprint enrollment request received");
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
