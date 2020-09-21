const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionController = require('./controllers/SessionController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingControler');

const routes = express.Router();
const upload = multer(uploadConfig);
//post
routes.post('/sessions', SessionController.store);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);
routes.post('/spots/:spot_id/booking', BookingController.store);

//get
routes.get('/spots',  SpotController.index);
routes.get('/dashboard', DashboardController.show);


module.exports = routes;