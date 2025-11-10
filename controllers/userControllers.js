const userModel = require("../models/userModel");

//get user info
const getUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.user.id);
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        //hiding password 
        user.password = undefined;
        //response 
        res.status(200).send({
            success: true,
            message: "User info fetched",
            user
        });
    } catch (error) {
        console.log("Get User Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in getting user info",
            error
        })
    }
}

//update user info
const updateUserController = async (req, res) => {
    try {
        //find user
        const user = await userModel.findById(req.user.id);
        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }
        //update user
        const {name, phone, address} = req.body;
        if(name) user.name = name;
        if(phone) user.phone = phone;
        if(address) user.address = address;
        //saving user
        await user.save();
        res.status(200).send({
            success: true,
            message: "User info updated",
            user
        });
    } catch (error) {
        console.log("Update User Error:", error);
        res.status(500).send({
            success: false,
            message: "Error in updating user info",
            error
        });
    }
};

module.exports = { 
    getUserController,
    updateUserController
};