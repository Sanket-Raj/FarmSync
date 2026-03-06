const express = require('express');
const { getFarms, getFarm, createFarm, updateFarm, deleteFarm } = require('../controllers/farmController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(protect, getFarms)
  .post(protect, createFarm);

router.route('/:id')
  .get(protect, getFarm)
  .put(protect, updateFarm)
  .delete(protect, deleteFarm);

module.exports = router;