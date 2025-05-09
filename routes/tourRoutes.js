const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tourController');
const {
  getAllTours,
  createTour,
  getTour,
  updatedTour,
  deletedTour,
  checkId,
  checkBody,
} = tourController;

router.param('id', checkId);

//

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updatedTour).delete(deletedTour);

module.exports = router;
