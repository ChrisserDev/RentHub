const mongoose = require('mongoose')

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

const VehicleModel = mongoose.model('vehicles', VehicleSchema)
module.exports = VehicleModel;