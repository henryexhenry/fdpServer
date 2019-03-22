const express = require('express');
const bodyParser = require('body-parser');

const restaurantRouter = express.Router();
const Restaurants = require('../models/restaurants');
const cors = require('./cors');
const authenticate = require('../authenticate');

restaurantRouter.use(bodyParser.json());

restaurantRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Restaurants.find(/*{"category": "drink"}*/req.query)
            .then((restaurants) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurants);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .post(cors.corsWithOptions, /*authenticate.verifyUser,*/  (req, res, next) => {
        Restaurants.create(req.body)
            .then((restaurant) => {
                console.log('Success: ', restaurant);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            }, (err) => next(err))
            .catch((err) => next(err))
    })
    .put(cors.corsWithOptions,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /restaurants');
    })
    .delete(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        Restaurants.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

//########################################################################################

restaurantRouter.route('/:restaurantId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        Restaurants.findById(req.params.restaurantId)
            .populate('comments.author')
            .then((restaurant) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    })
    .post(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /restaurants/' + req.params.restaurantId);
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Restaurants.findByIdAndUpdate(req.params.restaurantId, {
            $set: req.body
        }, { new: true })
            .then((restaurant) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(restaurant);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, /*authenticate.verifyUser, authenticate.verifyAdmin,*/ (req, res, next) => {
        Restaurants.findByIdAndRemove(req.params.restaurantId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => { next(err) })
            .catch((err) => { next(err) })
    });



module.exports = restaurantRouter;