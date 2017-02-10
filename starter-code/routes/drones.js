const express = require('express');

const Drone = require('../models/drone');

const router = express.Router();


router.get('/drones', (req, res, next) => {
  Drone.find({}, (err, drones) => {
    let doc = {
      drones: drones
    }
    if(err) {return next(err) }
    res.render('drones/index', doc);
  });
});


router.get('/drones/new', (req, res, next) => {
  res.render('drones/new');
});

router.post('/drones', (req, res, next) => {
  const droneInfo = {
      droneName: req.body.droneName,
      propellers: req.body.propellers,
      maxSpeed: req.body.maxSpeed
  };

   Drone.create(droneInfo, (err, doc) => {
     if(err) {
       next(err);
     } else {
       res.redirect('drones');
     }
   });
});


router.get('/drones/:id', (req, res, next) => {
  let droneId = req.params.id;
  Drone.findById(droneId, (err, drone) => {
    if (err) { return next(err); }
    res.render('drones/show', { drone: drone });
  });
});


router.get('/drones/:id/edit', (req, res, next) => {
  const droneId = req.params.id;
  Drone.findById(droneId, (err, drone) => {
    if (err) { return next(err); }
    res.render('drones/edit', { drone: drone});
  });
});

router.post('/drones/:id', (req, res, next) => {
  const droneId = req.params.id;
  const updates = {
    droneName: req.body.droneName,
    propellers: req.body.propellers,
    maxSpeed: req.body.maxSpeed
  };

  Drone.findByIdAndUpdate(droneId, updates, (err, drone) => {
    if (err){ return next(err); }
    return res.redirect('/drones');
  });
});


router.get('/drones/:id/delete', (req, res, next) => {
  const id = req.params.id;
  Drone.findByIdAndRemove(id, (err, drone) => {
    if (err){ return next(err); }
    return res.redirect('/drones');
  });
});


module.exports = router;
