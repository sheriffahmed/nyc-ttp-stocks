const express = require('express');
const router = express.Router();
const transactionModel = require('../models/transaction')
const portfolioModel = require('../models/portfolio')
const cashModel = require('../models/cash')
const stockMoodel = require('../models/stock')
const {sequelize} = require('../lib/db')
const stocksLib = require('../lib/stocks');


/* GET transaction listings. */
router.get('/:userId', async function(req, res, next) {
  try {
    const userTransactions = await transactionModel.findAll({
      where: {
        userId: req.params.userId
      }
    });
    res.send(userTransactions.map( t => t.toJSON()));
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send("Could not load transactions for user")
  }
})

/* GET transaction estimate. */
router.post('/estimate', async function(req, res, next) {
  try {
    const price = await stocksLib.getPrice(req.body.symbol)
    res.send({
      cost: price * req.body.quantity
    });
  } catch (err) {
    console.log(err)
    res.status(500)
    res.send("Could not generate estimate for user")
  }
})

// in this case since we didnt setup passport yet
// acceptu userid lol
// POST transaction listings.
router.post('/:userid', async function(req, res, next) {
  const t = await sequelize.transaction();
  try {
    const stock = await stockMoodel.findOne({
      where: {
        id: req.body.symbol
      }
    })
    if (!stock) {
      res.status(400)
      res.send("Stock does not exist")
      return
    }
    const cashAccount = await cashModel.findOne({
      where: {
        userId: req.params.userid
      }
    }) 
    const stockPrice = await stocksLib.getPrice(req.body.symbol) * req.body.quantity;

    if (cashAccount.balance < stockPrice * req.body.quantity) {
      res.status(400);
      res.send('insufficient balance');
      return;
    }
    cashAccount.balance -= (stockPrice * req.body.quantity);
    
    await cashAccount.save();
    await transactionModel.create({
      userId: req.params.userid,
      symbol: req.body.symbol,
      quantity: req.body.quantity,
      cost: stockPrice
    });

    const portfolio = await portfolioModel.findOne({
      where: {
        userId: req.params.userid,
        symbol: req.body.symbol
      }
    });
    
    if (!portfolio) {
      await portfolioModel.create({
        userId: req.params.userid,
        symbol: req.body.symbol,
        quantity: req.body.quantity
      });
    } else{
      portfolio.quantity += req.body.quantity;
      await portfolio.save();
    }
    await t.commit();
    res.send({balance: cashAccount.balance})
  } catch (err) {
    await t.rollback();
    console.log(err);
    res.send(500);
  }
});

module.exports = router;
