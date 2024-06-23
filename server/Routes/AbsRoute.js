const express = require("express");
const router = express.Router();
const upload = require("../util/Multer.js");

const { addLetter, getAbsenceLetter, getLetterLec, acceptLetter, rejectLetter } = require("../Controllers/AbsenceController.js");

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
router.get("/getAbsenceStu/:regNo", getAbsenceLetter);
router.get("/lecturer/:regNo/letters", getLetterLec);
router.put("/letter/:id/accept", acceptLetter);
router.put("/letter/:id/reject", rejectLetter);


module.exports = router;