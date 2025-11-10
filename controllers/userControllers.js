const userModel = require("../models/userModel");
//get user info
const getUserController = async (req, res) => {
    try {
        //find user
        console.log("User ID:", req.user.id);
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

module.exports = { getUserController };