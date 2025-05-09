const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/').get(getAllUsers).post(createdUser);
router.route('/:id').get(getUser).patch(updateddUser).delete(deletedUser);

module.exports = router;
