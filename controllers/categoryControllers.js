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

//get all categories
const getAllCatController = async (req, res) => {
    try {
        const categories = await categoryModel.find({});
        if(!categories) {
            return res.status(404).send({
                success: false,
                message: "No categories found"
            });
        }
        res.status(200).send({
            success: true,
            totalCat: categories.length,
            categories
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in getting Category Api",
            error
        });
    }
};

//update cat
const updateCatController = async (req, res) => {
    try {
        const {id} = req.params;
        const {title, imgUrl} = req.body;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {title, imgUrl},
            {new: true}
        );
        if(!updatedCategory) {
            return res.status(500).send({
                success: false,
                message: "No Category found"
            });
        }
        res.status(200).send({
            success: true,
            message: "Category Updated Successfully"
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating cat",
            error
        });
    }
};
//delete cat
const deleteCatController = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(500).send({
                success: false,
                message: "Please provide category id"
            });
        }
        const category = await categoryModel.findById(id);
        if(!category) {
            res.status(500).send({
                success: false,
                message: "No category found"
            });
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in delete cat api",
            error
        });
    }
};

module.exports = {
    createCatController,
    getAllCatController,
    updateCatController,
    deleteCatController
};