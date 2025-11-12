const mongoose = require('mongoose');

//Schema for Restaurant
const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "category title is required"]
    },
    imgUrl: {
        type: String,
        default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Ffood-categories&psig=AOvVaw2uGoHV7KpMF42JyN7-0VVH&ust=1763019524790000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCNC-tOGN7JADFQAAAAAdAAAAABAE"
    }
},{timestamps: true});

//export
module.exports = mongoose.model("Category", categorySchema);