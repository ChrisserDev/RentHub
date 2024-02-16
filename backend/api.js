require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const VehicleModel = require('./models/vehicleModel')

// Initialize Express app
const app = express();

//Using cors
app.use(cors())

// Body parsing middleware
app.use(express.json());

//Get all vehicles
app.get('/api/vehicles', async (req, res) => {
        try {
            const vehicles = await VehicleModel.find();
            console.log(vehicles)
            res.json(vehicles);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
});

//Get a single vehicle
app.get('/:id', async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id"})
    }
    const vehicle = await Vehicle.findById(id)

    if(!vehicle){
        return res.status(404).json({error: 'No such vehicle'})
    }
    res.status(200).json(vehicle)
})

//Post a new vehicle
app.post('/', async (req, res) => {
    const {carName, gearType, people} = req.body

    try {
        const newVehicle = await Vehicle.create({carName, gearType, people})
        res.status(200).json(newVehicle)
    } catch (error){
        res.status(400).json({error: error.message})
    }
});

//Delete a single vehicle
app.delete('/:id', async(req, res) =>{
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id"})
    }

    const vehicle = await Vehicle.findOneAndDelete({_id: id})

    if(!vehicle){
        return res.status(400).json({error: 'No such vehicle'})
    }

    res.status(200).json(vehicle)
});

//Update a single vehicle
app.patch('/:id', async(req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id"})
    }

    const vehicle = await Vehicle.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!vehicle){
        return res.status(400).json({error: 'No such vehicle'})
    }

    res.status(200).json(vehicle)
})

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('Connected to MongoDB');
    // Start the server after MongoDB connection is established
    app.listen(process.env.PORT, () => {
        console.log('App listening on port', process.env.PORT);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
    
});