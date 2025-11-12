const categoryModel = require("../models/categoryModel");
//create category
const createCatController = async (req, res) => {
    try {
        const {title, imgUrl} = req.body;
        //validation
        if(!title) {
            return res.status(500).send({
                success: false,
                message: "Please provide category title or image"
            });
        }
        const newCategory = new categoryModel({title, imgUrl});
        await newCategory.save();
        res.status(200).send({
            success: true,
            message: "Category created successfully",
            newCategory
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error at creating cat Api",
            error
        });
    }
};

module.exports = {
    createCatController
};