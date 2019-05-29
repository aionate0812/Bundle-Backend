const express = require('express');
const userRouter = express.Router();
const UserService = require('../services/userService');

userRouter.post('/', (req, res, next) => {
    const { uid, username, email } = req.body;

    UserService.createUser(uid, username, email)
    .then(({ id }) => {
        res.status(200)
        res.json(id)
    })
    .catch(err => next(err))
});

userRouter.get('/getUserByUid/:uid', (req, res, next) => {
    const { uid } = req.params;

    UserService.readUserByUid(uid)
    .then(data => {
        res.status(200)
        res.json(data)
    })
    .catch(err => next(err))
});

userRouter.get('/getUserById/:id', (req, res, next) => {
    const { id } = req.params;

    UserService.readUserById(id)
    .then(data => {
        res.status(200)
        res.json(data)
    })
    .catch(err => next(err))
});

userRouter.get('/getUserByEmail/:email', (req, res, next) => {
    const { email } = req.params;

    UserService.readUserByEmail(email)
    .then(data => {
        res.status(200)
        res.json(data)
    })
    .catch(err => next(err))
});

module.exports = userRouter;