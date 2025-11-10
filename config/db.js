const mongoose = require('mongoose');
const colors = require('colors');

//function to connect to database
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(
            `Connected to Database ${mongoose.connection.host}`.bgCyan
        );
    } catch (error) {
        console.log("DB Error:", error);
    }
}

module.exports = connectDb;