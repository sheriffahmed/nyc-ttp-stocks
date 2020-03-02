const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const cashModel = require('../models/cash')
const userModel = require('../models/user');
const portfolioLib = require('../lib/portfolio')
const {sequelize} = require('../lib/db')

const SALT_ROUNDS = 10;
const DEFAULT_BALANCE = 5000;

// User Signup Endpoint
router.post('/', async function(req, res) {
  const t = await sequelize.transaction();
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const user = await userModel.create({
      first: req.body.first,
      last: req.body.last,
      email: req.body.email,
      password: hashedPassword
    });
    if (!user) {
      throw new Error("couldn't create user");
    }
    cashModel.create({
      userId: user.id,
      balance: DEFAULT_BALANCE
    });
    res.send(user.toJSON());
    await t.commit();
  } catch (err) {
    console.log('user error', err)
    await t.rollback()
    res.send(err)
  }  
});

router.get('/:id/cash', async function(req, res) {
  try { 
    const cashAccount = await cashModel.findOne({
      where: {
        userId: req.params.id
      }
    }) 
    console.log("where da money js");
    if (!cashAccount){
      res.sendStatus(404);
      return;
    }
    res.send(cashAccount.toJSON())
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
});

router.get('/:id/portfolio', async function(req, res) {
  try { 
    const portfolio = await portfolioLib.getPortfolio(req.params.id)
    if (!portfolio) {
      res.sendStatus(404);
      return;
    }
    res.send(portfolio) 
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
});

module.exports = router;