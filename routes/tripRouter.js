const express = require('express');
const tripRouter = express.Router();
const TripService = require('../services/tripService');


tripRouter.post('/', (req, res, next) => {
    const { name, country, city, departure_date, return_date, user_id } = req.body;

    TripService.create(name, country, city, departure_date, return_date, user_id)
        .then(({ id }) => {
            res.status(200);
            res.json({ id });
        })
        .catch(err => {
            next(err);
        })
});

tripRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;

    TripService.read(id)
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            next(err);
        })
});

tripRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;

    TripService.updateTrip(req.body, id)
        .then(data => {
            res.status(200);
            res.json({ success: true })
        })
        .catch(err => {
            next(err);
        })
})

module.exports = tripRouter;