const mongoose = require('mongoose')

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

const BookingModel = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);
module.exports = BookingModel;

//By checking mongoose.models.Booking before calling mongoose.model('Booking', bookingSchema), you prevent Mongoose from attempting to compile the model again if it's already been compiled.