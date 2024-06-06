const express = require("express");
const router = express.Router();
const upload = require("../util/Multer.js");

const { addLetter, getAbsenceLetter } = require("../Controllers/AbsenceController.js");

const MulterErrorHandler = ( err, req, res, next) => {
    if(err){
        res.status(400);
        throw new Error(err.message);
    }
    else {
        next();
    }

};


router.post("/addletter", upload.single("pdf"), MulterErrorHandler, addLetter);
router.get("/getAbsenceStu", getAbsenceLetter);


module.exports = router;