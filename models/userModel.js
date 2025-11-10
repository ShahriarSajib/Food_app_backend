const mongoose = require('mongoose');

//Schema for User
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        address: {
            type: Array,
            default: ""
        },
        phone: {
            type: String,
            required: [true, "Phone number is required"]
        },
        userType: {
            type: String,
            required: [true, "User type is required"],
            enum: ["customer", "admin", "vendor", "driver"],
            default: "customer"
        },
        profile: {
            type: String,
            default: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fdepositphotos.com%2Fvectors%2Fprofile-placeholder.html&psig=AOvVaw1mzRnuTyxiIePW8rw4Y6-A&ust=1762863894242000&source=images&cd=vfe&opi=89978449&ved=0CBUQjRxqFwoTCKiEwfvJ55ADFQAAAAAdAAAAABAK"
        }
    },{timestamps: true}
);

//export
module.exports = mongoose.model("User", userSchema);