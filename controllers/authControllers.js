const userModel = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//registration controller
const registerController = async (req, res) => {
    try {
        const {
            name, 
            email, 
            password, 
            phone,
            address, 
            userType,
            answer
        } = req.body;
        //validation
        if(!name || !email || !password || !phone || !address || !userType || !answer){
            return res.status(500).send({
                success: false,
                message: "Please fill all required fields"
            });
        }
        //check user
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(500).send({
                success: false,
                message: "User already exists"
            });
        }
        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        //replace plain password with hashed password
        req.body.password = hashedPassword;

        //save/register/create user
        const user = await userModel.create(req.body);
        return res.status(201).send({
            success: true,
            message: "User registered successfully",
            user
        });
    } catch (error) {
        console.log("Register Controller Error:", error);
        return res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        });
    }
}

//login controller

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        //validation
        if(!email || !password){
            return res.status(500).send({
                success: false,
                message: "Please provide email and password"
            });
        }
        //check user
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Invalid email"
            });
        }
        //compare password, dycrypt and match
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            });
        }
        //token
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET, 
            {expiresIn: "7d"}
        );
        //hiding password in response
        user.password = undefined;
        
        return res.status(200).send({
            success: true,
            message: "Login successful",
            token,
            user
        });
    } catch (error) {
        console.log("Login Controller Error:", error);
        return res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        });
    }
}

module.exports = {
    registerController,
    loginController
};