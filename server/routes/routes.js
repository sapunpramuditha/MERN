const Router = require('express').Router();
const User = require('../models/user_model');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../config');
const Token = require("../models/token");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

//To sign JWT token before sending in cookie to Client
function signToken(userID) {
    return jwt.sign({
        iss: 'moonServer',
        sub: userID
    }, 'secret', {expiresIn:'1h'})
}


Router.post("/register", (req, res) => {
    const {uid,firstName,lastName,email,mobile,gender,status,password,password1,role} = req.body;

    User.findOne({email}, function(err, user) {
        if(err)
            return res.status(500).json({msg: err.message, error: true})
        if(user)
            return res.status(400).json({msg: "User already exist", error: true})
        else {
            const newUser = new User({
                uid,
                firstName,
                lastName,
                email,
                mobile,
                gender,
                status,
                password,
                password1,
                role
            })

            newUser.save((err, user) =>{
                if(err)
                    return res.status(500).json({msg: err.message, error: true})
                else{
                    const token = signToken(user.id);
                    //httpOnly prevents XSS (read in my authentication doc for more info)
                    res.cookie("access_token", token, {maxAge:3600*1000, httpOnly: true, sameSite: true});
                    //emai configuration
                    const token1 =  new Token({
                        userId: user._id,
                        token1: crypto.randomBytes(32).toString("hex"),
                    }).save();
                    const url = `${process.env.BASE_URL}users/${user.id}/verify/${token1.token1}`;
                    sendEmail(user.email, "Verify Email", url);
                    return res.status(200).json({ isAuthenticated: true, user: {email, role}, error: false });
                    
                    
		

                }
            })
        }
    })
})


Router.post("/login", passport.authenticate('local', {session: false}), (req, res) => {
    const {id, email, role} = req.user;
    const token = signToken(id);

    res.cookie("access_token", token, {maxAge:3600*1000, httpOnly: true, sameSite: true});
    
    return res.status(200).json({ isAuthenticated: true, user: {email, role} })
})


//Admin and normal user can access
Router.get("/protectedData", passport.authenticate('jwt', {session: false}), (req, res) => {
    return res.status(200).json({data: "You can't Access to this"})
})


//only Admin can access
Router.get("/admin/protectedData", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {role} = req.user;
    if(role === "admin")
        return res.status(200).json({data: "Protected Data"})

    return res.status(403).json({data: ""})
})


//Check auth status everytime front-end app refreshes
Router.get("/authenticated", passport.authenticate('jwt', {session: false}), (req, res) => {
    const {email, role} = req.user;
    return res.status(200).json({ isAuthenticated: true, user: {email, role} })
})

//Logout need authenticate first because only authenticated user that can log out.
Router.get("/logout", passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie("access_token");
    return res.status(200).json({ success: true, user: {email:"", role: ""} })
})



module.exports = Router;