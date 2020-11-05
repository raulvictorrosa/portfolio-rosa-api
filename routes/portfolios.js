const express = require('express');
const router = express.Router();
const {
  getPortfolios,
  getPortfolioBydId,
} = require('../controllers/portfolios');

router.get('/', getPortfolios);
router.get('/:id', getPortfolioBydId);

module.exports = router;
