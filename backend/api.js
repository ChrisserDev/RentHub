require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const VehicleModel = require('./models/vehicleModel')
const BookingModel = require('./models/bookingModel')

// Initialize Express app
const app = express();

//Using cors
app.use(cors())

// Body parsing middleware
app.use(express.json());

//Getting all the vehicles
app.get('/api/vehicles', async (req, res) => {
        try {
            const vehicles = await VehicleModel.find();
            res.status(200).json(vehicles);
        } catch (error) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
});

//Getting all the locations available.
app.get('/locations', async (req, res) => {
    try {
      //For each group, it creates a new document with an _id field set to the value of $location and a locationImage field set to the first locationImage encountered in each group of documents. 
      const uniqueLocations = await VehicleModel.aggregate([
        { $group: { _id: "$location", locationImage: { $first: "$locationImage" } } }
      ]);
  
      res.status(200).json(uniqueLocations);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//Getting the city
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

//Getting a single vehicle
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

//Post the booking contact details
app.post('/api/bookingdata', async (req, res) => {
    try {
      const newData = new BookingModel(req.body);
      const savedData = await newData.save();
      res.status(201).json(savedData);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    // Start the server after MongoDB connection is established
    app.listen(process.env.PORT, () => {
        console.log('App listening on port', process.env.PORT);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});