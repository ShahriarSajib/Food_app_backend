const mongoose = require('mongoose');

//Schema for Restaurant
const restaurantSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Restaurant title is required"]
    },
    imgUrl: {
        type: String
    },
    foods: {
        type: Array,
    },
    coords: {
        id: {type: String},
        latitude: {type: Number},
        latitudeDelta: {type: Number},
        longitude: {type: Number},
        longitudeDelta: {type: Number},
        title: {type: String},
        address: {type: String}
    },
    phone : {
        type: String
    },
    time : {
        type: String,
    },
    pickup: {
        type: Boolean,
        default: true
    },
    delivery: {
        type: Boolean,
        default: true
    },
    isOpen: {
        type: Boolean,
        default: true
    },
    logoUrl: {
        type: String
    },
    rating: {
        type: Number,
        default: 1,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: String
    },
    code: {
        type: String
    }
},{timestamp: true});

//export
module.exports = mongoose.model("Restaurant", restaurantSchema);