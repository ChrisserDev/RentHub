const mongoose = require('mongoose')

// This code defines a Mongoose schema and model for a booking system.
const BookingSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    pickUpTime: {
        type: String,
        required: true
    },
})

//Checking if the mongoose.models.Booking exists before calling mongoose.model('Booking', bookingSchema).
const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;