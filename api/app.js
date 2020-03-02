require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const app = express();

const SALT_ROUNDS = 10;

async function init() {
  const db = require('./lib/db')
  const cache = require('./lib/cache')

  // initialize database connection
  await db.connect()

  // models
  const userModel = require('./models/user');
  require('./models/portfolio');
  require('./models/stock');
  require('./models/cash')
  require('./models/transaction')

  passport.use(new LocalStrategy(
    async function(username, password, done) {
      console.log("RUNNIGN LOCAL STRATEGY");
      try {
        const user = await userModel.findOne({
          where: {
            username
        }});
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        if (!await bcrypt.compare(password, hashedPassword)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    try {
      const user = await userModel.findOne({
        where: id
      });
      done(null, user);
    } catch(err) {
      done(err);
    }
  });
  
  const indexRouter = require('./routes/index');
  const usersRouter = require('./routes/users');
  const transactionsRouter = require('./routes/transactions');

  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(session({
    secret: "ttp-cats",
    resave: false,
    saveUninitialized: true,
  }));
  app.use(passport.initialize());
  app.use(passport.session());
     
  app.post('/login', async (req,res) => {  
    console.log(req.body)

    let user = await req.body.username
    let pass = await req.body.password
    let LS = async function (username , password ) {
    console.log("RUNNIGN LOCAL STRATEGY", username);
    try {
      const user = await userModel.findOne({
        where: {
          username
      }});
      if (!user) {
        res.status(500).send(done(null, false, { message: 'Incorrect email.' }));
      }
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      if (!await bcrypt.compare(password, hashedPassword)) {
        res.status(500).send(done(null, false, { message: 'Incorrect password.' }));
      }
      return done(null, user);
    } catch (err) {
      res.send(err);
    }
  }
  passport.authenticate('local', 
 LS(user, pass)
  )()
  }); 
                            
  app.use('/', indexRouter); 
  app.use('/users', usersRouter);
  app.use('/transactions', transactionsRouter);
  

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    console.log("error", err)

    // render the error page
    res.status(err.status || 500);
    res.send('error');
  });
}

init()

module.exports = app;
