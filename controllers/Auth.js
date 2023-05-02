const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config(); 


// signup route handler
exports.signup = async (req,res) =>{
    try{
        //get data
        const {name,email,password,role} = req.body;
        // check if user already exist
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message: "User already Exists",
            });
        }

        // secure password
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch(err){
            return res.status(500).json({
                success:false,
                message: "Error in hashing password",                
            })
        }

        // create entry for user 
        const user = await User.create({
            name,email,password:hashedPassword,role
        })

        return res.status(200).json({
            success:true, 
            message:"user created successfully",
        })
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success:false,
            message:"user cannot registered, please try again later",
        })

    }
}



// login

exports.login = async (req,res) => {
     try{
        // fetch data
        const {email,password} = req.body;
        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "please fill all the details.",
            });
        }

        // check for registered email
        let user = await User.findOne({email});

        // if not a registered use
        if(!user){
            return res.status(401).json({
                success: false,
                message: "User is not registered"
            })
        }


        const payload = {
            email : user.email,
            id:user._id,
            role:user.role,
        };

        // verify password and generate JWT token
        if(await bcrypt.compare(password, user.password)){
            // password match
            let token = jwt.sign(payload,
                                process.env.JWT_SECRET,
                                {
                                    expiresIn:"2h"
                                });
            
            user = user.toObject();
            user.token = token;
            user.password = undefined;
            const options= {
                expires : new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true

            }
            
            res.cookie("pratikCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "user logged in successfully"
            })

        }
        
        else{
            // password do not match
            return res.status(403).json({
                success:false,
                message: "Password Incorrect"
            })
        }

     }


     catch(err){
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "login Faiure"
        })
    }
}