const resturantModel = require("../models/resturantModel");
const createResturantController = async (req, res) => {
    try {
        const {title, imgUrl, foods, coords, phone, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code} = req.body;
        //validation
        if(!title || !coords){
            return res.status(500).send({
                success: false,
                message: "Title and Coords are required"
            });
        }
        const newResturant = new resturantModel({
            title,
            imgUrl,
            foods,
            coords,
            phone,
            time,
            pickup,
            delivery,
            isOpen,
            logoUrl,
            rating,
            ratingCount,
            code
        });
        await newResturant.save();
        return res.status(201).send({
            success: true,
            message: "Resturant created successfully",
            newResturant
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in creating resturant api",
            error
        });
    }
};

//get all resturants controller
const getAllResturantController = async (req, res) => {
    try {
        const resturant = await resturantModel.find({});
        if(!resturant) {
            return res.status(404).send({
                success: false,
                message: "No Resturant Available"
            });
        }
        res.status(200).send({
            success: true,
            totalCount: resturant.length,
            resturant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in creating resturant api",
            error
        });
    }
};
//get resturant by id
const getResturantByIDController = async (req, res) => {
    try {
        const resturantId = req.params.id;
        if(!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide resturant"
            });
        }
        //find resturant
        const resturant = await resturantModel.findById(resturantId);
        if(!resturant) {
            return res.status(404).send({
                success: false,
                message: "No resturant found"
            });
        }
        res.status(200).send({
            success: true,
            resturant
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error In get resturant by id api",
            error
        });
    }
};
//delete resturant
const deleteRestaurantController = async (req, res) => {
  try {
    const resturantId = req.params.id;
        if(!resturantId) {
            return res.status(404).send({
                success: false,
                message: "Please provide resturant"
            });
        }

    // Optional: You can also check ownership
    // if (restaurant.owner.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Not authorized to delete this restaurant",
    //   });
    // }

    await resturantModel.findByIdAndDelete(resturantId);

    res.status(200).json({
      success: true,
      message: "Restaurant deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting restaurant:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting restaurant",
    });
  }
};
module.exports = {
    createResturantController,
    getAllResturantController,
    getResturantByIDController,
    deleteRestaurantController
};