const express = require('express')
const router = express.Router()
const {
  getPortfolios,
  getPortfolioBydId,
  createPortfolio
} = require('../controllers/portfolios')
const { checkJwt } = require('../controllers/auth')

router.get('/', getPortfolios)
router.get('/:id', getPortfolioBydId)

router.post('/', checkJwt, createPortfolio)

module.exports = router
