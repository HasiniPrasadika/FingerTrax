const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const depRoute = require("./Routes/DepRoute");
const modRoute = require("./Routes/ModRoute");
const attRoute = require("./Routes/AttRoutes");
const bodyParser = require('body-parser');
const absRoute = require("./Routes/AbsRoute");

app.use(bodyParser.json({ limit: '50mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));


const PORT = process.env.PORT || 8070;
const URL = process.env.MONGODB_URL;

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
app.use("/api/modules", modRoute);
app.use("/api/attendance", attRoute);
app.use("/api/absenceletters", absRoute);


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
