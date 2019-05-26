const express = require('express');
const categoryRouter = express.Router();
const CategoryService = require('../services/categoryService');

categoryRouter.get('/:id', (req, res, next) => {
    const { id } = req.params;

    CategoryService.read(id)
        .then(data => {
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            next(err);
        })
});

module.exports = categoryRouter;