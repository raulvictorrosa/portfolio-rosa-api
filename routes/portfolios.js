const express = require('express')
const router = express.Router()
const {
  getPortfolios,
  getPortfolioBydId,
  createPortfolio,
  updatePortfolio,
  deletePortfolio
} = require('../controllers/portfolios')
const { checkJwt } = require('../controllers/auth')

router.get('/', getPortfolios)
router.get('/:id', getPortfolioBydId)

router.post('/', checkJwt, createPortfolio)

router.patch('/:id', checkJwt, updatePortfolio)

router.delete('/:id', checkJwt, deletePortfolio)

module.exports = router
