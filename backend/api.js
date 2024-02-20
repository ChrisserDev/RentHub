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
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
});

app.get('/locations', async (req, res) => {
    try {
      const uniqueLocations = await VehicleModel.aggregate([
        { $group: { _id: "$location", locationImage: { $first: "$locationImage" } } }
      ]);
  
      res.status(200).json(uniqueLocations);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.get('/location/:city', async (req, res) => {
    try {
      const requestedCity = req.params.city;
  
      // Check if the requested city is valid (exists in your dataset)
      const isValidCity = await VehicleModel.exists({ location: requestedCity });
  
      if (!isValidCity) {
        return res.status(404).json({ error: 'City not found' });
      }
  
      const vehiclesInCity = await VehicleModel.find({ location: requestedCity });
      res.status(200).json(vehiclesInCity);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


app.get('/types', async (req, res) => {
    try {
        const types = await VehicleModel.distinct('type');
        res.status(200).json(types);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Get a single vehicle
app.get('/:id', async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "Invalid id"})
    }
    const vehicle = await VehicleModel.findById(id)

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

    const vehicle = await VehicleModel.findOneAndDelete({_id: id})

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

    const vehicle = await VehicleModel.findOneAndUpdate({_id: id}, {
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