const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/drones');
const Drone = require('../models/drone');

const drones = [
  {
    droneName: 'destroyer',
    propellers: '4',
    maxSpeed: '50',
  },
  {
    droneName: 'daisy',
    propellers: '8',
    maxSpeed: '40',
  },
  {
    droneName: 'Mini',
    propellers: '16',
    maxSpeed: '100',
  }
];

Drone.create(drones, (err, docs) => {
  if (err) { throw err };

  docs.forEach( (drone) => {
    console.log(drone.droneName)
  })
  mongoose.connection.close();
});
