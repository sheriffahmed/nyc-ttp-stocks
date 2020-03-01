const portfolioModel = require('../models/portfolio');
const stocks = require('./stocks');

async function getPortfolio(userId) {
  const portfolio = await portfolioModel.findAll({
    where: {
      userId: userId
    }
  }) 

  if (!portfolio.length){
    return null;
  }

  const prices = await Promise.all(
    portfolio.map(p=>stocks.getPrice(p.symbol, {useCache: true}))
  )

  const total = prices.reduce(
    (acc, curr, i)=>acc + prices[i] * portfolio[i].quantity, 0
  )

  const response = {
    total,
    portfolio: portfolio.map(
      (row, i) => ({
        ...row.toJSON(),
        price: prices[i] * portfolio[i].quantity
      })
    )
  }
  return response;
}

module.exports = {
    getPortfolio
}