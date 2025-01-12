const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: [true, "Email is required!"]
    },
    contact_no: {
        type: Number,
        required: [true, "Contact_no is required!"]
    },
    subject: {
        type: String,
        required: [true, "Subject is required!"]
    },
    message: {
        type: String,
        required: [true, "Message is required!"]
    },
},{ timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;