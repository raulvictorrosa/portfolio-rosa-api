const express = require('express')
const router = express.Router()
const {
  getPortfolios,
  getPortfolioBydId,
  createPortfolio
} = require('../controllers/portfolios')

router.get('/', getPortfolios)
router.get('/:id', getPortfolioBydId)

router.post('/', createPortfolio)

module.exports = router
