const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const { getAllTours, createTour, getTour, updatedTour, deletedTour } =
  tourController;

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTour).patch(updatedTour).delete(deletedTour);

module.exports = router;
