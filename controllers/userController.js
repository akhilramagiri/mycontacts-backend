const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req,res) => { 
    const {username, email, password } = req.body;
    if(!username ||  !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable) {
        res.status(400);
        throw new Error("User Already registerd");
    } 

    //Hash password
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password", hashedPassword); 

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });
    if(user) {
        res.status(201);
        res.json({_id : user._id,
            username: user.username,
        });
    } else {
        res.status(400);
        throw new Error("Error Creating User");
    }
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req,res) => { 
    res.json({ message : "Login User"});
});

//@desc Current user
//@route POST /api/users/current
//@access public
const currentUser = expressAsyncHandler(async (req,res) => { 
    res.json({ message : "Current User information"});
});

module.exports = {registerUser , loginUser , currentUser};