const mongoose = require("mongoose");

const absenceSchema = mongoose.Schema({

    absStuName :{
        type : String,
        required: true
    },

    absRegNo : {
        type : String,
        required: true
    },

    absModCode : {
        type : String,
        required: true
    },
    absModName : {
        type : String,
        required: true
    },
   
    absDate : {
        type: String,
        required: true
    },

    absLecHours : {
        type : String,
        required : true
    },

    description : {
        type : String,
        required : true
    },

    letters :
        {
            public_id : String,
            url : String
        }
    
});

module.exports = mongoose.model("AbsenceLetter", absenceSchema);