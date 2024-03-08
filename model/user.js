const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: String,
    designation: String,
    gender: String,
    course: Array,
    image: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('People', userSchema);
