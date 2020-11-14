const mongoose = require('mongoose')
const Portfolio = mongoose.model('Portfolio')

exports.getPortfolios = async (req, res) => {
  const portfolios = await Portfolio.find({})
  return res.json(portfolios)
}

exports.getPortfolioBydId = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id)
    return res.json(portfolio)
  } catch (error) {
    return res.status(422).json(error)
  }
}

exports.createPortfolio = async (req, res) => {
  const portfolioData = req.body
  const userId = req.user.sub
  const portfolio = new Portfolio(portfolioData)
  portfolio.userId = userId

  try {
    const newPorfolio = await portfolio.save()
    return res.json(newPorfolio)
  } catch (error) {
    return res.status(422).send(error.message)
  }
}
