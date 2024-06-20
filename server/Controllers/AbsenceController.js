const asyncHandler = require("express-async-handler");
const AbsenceLetter = require("../Models/AbsenceModel");
const Module = require("../Models/ModuleModel")
const cloudinary = require("../util/Cloudinary.js");
const fs = require("fs");
const path = require("path");
const { Error } = require("mongoose");

const addLetter = asyncHandler(async (req, res) => {

    const { absStuName, absRegNo, absModCode, absModName, absDate, absLecHours, description } = req.body;   
    const file = req.file;
    
    if(!file || file.mimetype !== "application/pdf"){
        res.status(400);
        throw new Error("Only pdf files are allowed for submission!");              
    }

    const result = await cloudinary.uploader.upload(file.path, {
        folder : "fingertrax",
        resource_type : "raw"
    });

    fs.unlink(file.path, (err) => {
        if(err){
            console.error("Failed to delete file from Uploads :", err);
        } else {
            console.log("file deleted successfully");
        }
    })

    // console.log("Request body:", req.body);
    // console.log("Request files:", req.file);   
    
    const letterExists = await AbsenceLetter.findOne({ absRegNo, absModCode, absDate });

    if (letterExists) {
        res.status(404);
        throw new Error("Absence Letter is already submitted");
    } 

    const absenceLetter = await AbsenceLetter.create({
        absStuName,
        absRegNo,
        absModCode,
        absModName,
        absDate,
        absLecHours,
        description,
        letters: {
            public_id : result.public_id,
            url : result.secure_url
        }          
        
    });

    if (absenceLetter) {
        res.status(201).json({
            _id: absenceLetter._id,
            absStuName: absenceLetter.absStuName,
            absRegNo: absenceLetter.absRegNo,
            absModCode: absenceLetter.absModCode,
            absModName: absenceLetter.absModName,
            absDate: absenceLetter.absDate,
            absLecHours: absenceLetter.absLecHours,
            description: absenceLetter.description,
            letters: absenceLetter.letters,

        });
    } else {
        console.error("Error submitting letter", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

});

// View letter in Stu_Side
const getAbsenceLetter = asyncHandler (async (req, res) => {

    const absRegNo = req.params.regNo;
    const absenceStu = await AbsenceLetter.find({absRegNo}).select('absModName absDate absLecHours letters');
    res.json(absenceStu);   

});

// View letter in Lec_Side
const getLetterLec = asyncHandler (async (req, res) => {
    const lecRegNo = req.params.regNo;
    const modules = await Module.find({modCoordinator: lecRegNo}).select('modCode');
    const modCodes = modules.map(module => module.modCode);

    const absenceView = await AbsenceLetter.find({absModCode : { $in: modCodes }}).select('absStuName absRegNo absModName absDate absLecHours letters');
    res.json(absenceView);

});


module.exports = { addLetter, getAbsenceLetter, getLetterLec };

