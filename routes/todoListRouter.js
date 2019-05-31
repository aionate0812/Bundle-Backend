const todoListRouter = require('express').Router();
const { create, read, readAll, update, deleteTodoList } = require('../services/todoListService');
const todoRouter = require('./todoRouter');

todoListRouter.use('/todo', todoRouter);

todoListRouter.post('/', (req, res, next) => {
    const { name, trip_id } = req.body;
    create(name, trip_id)
    .then(({ id }) => {
        res.status(200);
        res.json({
             id,
        });
    })
    .catch(err => {
        next(err)
    });
});

todoListRouter.get('/all', (req, res, next) => {
    readAll()
        .then((data) => {
            res.status(200);
            res.json(data);
        })
        .catch(err => {
            next(err);
        })
})

todoListRouter.get('/:id', (req, res, next) => {
    const { trip_id } = req.body;
    read(trip_id)
        .then((data) => {
            res.status(200);
            res.json(data)
        })
        .catch(err => {
            next(err)
        });
});

todoListRouter.put('/:id', (req, res, next) => {
    const { id } = req.params;
    update(req.body, id)
    .then(() => {
        res.status(200);
        res.json({
            message: `List ${id} updated.`
        })
    })
});

todoListRouter.delete('/:id', (req, res, next) => {
    const { id } = req.params;
    deleteTodoList(id)
    .then(() => {
        res.status(200);
        res.json({
            message: `List ${id} deleted.`
        })
    });
});

module.exports = todoListRouter;