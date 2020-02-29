#!/usr/bin/env node

const Cash = require('../models/cash')
const User = require('../models/user')
const Stock = require('../models/stock')
const Transaction = require('../models/transaction')
const Portfolio = require('../models/portfolio')
const {sequelize} = require('../lib/db')

// Helper functions
function createUser(first, last, email) {
  return sequelize.sync()
    .then(() => User.create({first, last, email}))
    .then(async (user) => {
      console.log('created user', user.toJSON());
      await createCashAccount(user)
      return user
    });
}

function createCashAccount(user) {
  const DEFAULT_BALANCE = 5000
  return sequelize.sync()
    .then(() => Cash.create({
      userId: user.id,
      balance: DEFAULT_BALANCE
    }))
    .then(cash => {
      console.log(`created cash account for user ${user.id} with $${cash.balance}`);
      return cash
    });
}

function createStocks() {
  const stocks = [
    Stock.create({
      id: "WORK"
    }),
    Stock.create({
      id: "UBER"
    }),
    Stock.create({
      id: "LYFT"
    }),
    Stock.create({
      id: "SFTBY"
    }),
    Stock.create({
      id: "MSFT"
    }),
    Stock.create({
      id: "AMZN"
    }),
    Stock.create({
      id: "SPOT"
    }),
    Stock.create({
      id: "AAPL"
    }),
    Stock.create({
      id: "FB"
    }),
    Stock.create({
      id: "TLSA"
    }),
    Stock.create({
      id: "GOOG"
    }),
    Stock.create({
      id: "TWLO"
    })
  ]
  return sequelize.sync()
    .then(() =>  Promise.all(stocks))
    .then(stocks => {
      debugger
      console.log(`HEEEEEEEEEYY CHECK THIS OOUT ${stocks}`)
      return stocks
    });ᄀ
}

function createTransaction(user, stocks) {
  const quantity = [10, 100, 5, 20, 5, 7, 8]
  const prices = [260.3, 1000, 600, 30, 20, 9, 9]

  const transactions = stocks.map((stock, i)=>{
    return Transaction.create({
      userId: user.id,
      symbol: stock.id,
      quantity: quantity[i],
      cost: prices[i]
    })
  })
  
  return sequelize.sync()
    .then(() => Promise.all(transactions))
    .then(transactions => {
      createPortfolio(user, transactions)
    });
}

function createPortfolio(user, transactions) {
  return sequelize.sync()
    .then(() => transactions.map(transaction=>
      Portfolio.create({
        userId: user.id,
        symbol: transaction.symbol,
        quantity: transaction.quantity
      })))
    .then(portfolio => {
      console.log(portfolio);
    });
}

// Setup

async function setup() {
  await sequelize.sync({force: true})
  console.log('all tables created')
  const stocks = await createStocks()
  const users = await Promise.all([
    createUser("Sheriff", "Ahmed", "sheriff@spotify.com"),
    createUser("Jon", "Ji", "nosjon@slack.com")
  ])
  // await Promise.all([
  //   createTransaction(users[0], stocks.slice(0, 4)),
  //   createTransaction(users[1], stocks.slice(4, 11))
  // ]);
  console.log("Setup complete")
}

setup()
