const mongoose = require('mongoose')

//This code defines a Mongoose schema and model for the vehicles.
const VehicleSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    carName: {
        type: String,
        required: true
    },
    gearType: {
        type: String,
        required: true
    },
    people: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        required: true
    },
    bags: {
        type: Number,
        required: true
    },
    features: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    locationImage: {
        type: String,
        required: true
    }
})

//This creates a Mongoose model name 'VehicleModel' based on the 'VehicleSchema' schema.
const VehicleModel = mongoose.model('vehicles', VehicleSchema)
module.exports = VehicleModel;