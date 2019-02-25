const express = require('express');
const bodyParser = require('body-parser');

const foodRouter = express.Router();
const Foods = require('../models/foods');
const cors = require('./cors');
const authenticate = require('../authenticate');

foodRouter.use(bodyParser.json());

foodRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Foods.find(/*{"category": "drink"}*/req.query)
            .then((foods) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(foods);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, /*authenticate.verifyUser*/ , (req, res, next) => {
        Foods.create(req.body)
            .then((food) => {
                console.log('Success: ', food);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(food);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /foods');
    })
    .delete(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin*/, (req, res, next) => {
        Foods.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//########################################################################################

foodRouter.route('/:foodId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Foods.findById(req.params.foodId)
            .populate('foods.author')
            .then((food) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(food);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    })
    .post(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /foods/' + req.params.foodId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Foods.findByIdAndUpdate(req.params.foodId, {
            $set: req.body
        }, { new: true })
            .then((food) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(food);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Foods.findByIdAndRemove(req.params.foodId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    });



module.exports = foodRouter;