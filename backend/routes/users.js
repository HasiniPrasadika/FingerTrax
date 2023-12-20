const router = require('express').Router();
let User = require("../models/user");

//Create a new user

router.route("/add").post(async(req,res) =>{
    const username = req.body.username;
    const password = req.body.password;
    const role = req.body.role;

    const newUser = new User({
        username,
        password,
        role
    })
    try{
        const systemuser = await User.findOne({username:username, password:password, role:role})

        if(systemuser){
            res.json("exist")
        }
        else{
            res.json("not exist")
            newUser.save()
        }
    }
    catch(e){
        res.json("fail")
    }
})