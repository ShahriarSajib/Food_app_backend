//get user info
const getUserController = (req, res) => {
    res.status(200).send({
        success: true,
        message: "User info fetched successfully",
        user: req.user, // assuming req.user is populated by an authentication middleware
    });
}

module.exports = { getUserController };